using Microsoft.Azure.CognitiveServices.Vision.Face;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;
using TMDbLib.Client;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Search;
using TMDbLib.Objects.Trending;

namespace Moodflix.Services;

public class MoodflixService : IMoodflixService
{
    IConfiguration _configuration;

    public MoodflixService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<DetectedFace> AnalyseSentimentFromPhoto(string base64photo)
    {
        var bytes = Convert.FromBase64String(base64photo);
        var contents = new MemoryStream(bytes);

        var client = new FaceClient(new ApiKeyServiceClientCredentials(_configuration["Moodflix:FaceAPIKey"])) { Endpoint = _configuration["Moodflix:FaceAPIEndpoint"] };

        var detectedFaces = await client.Face.DetectWithStreamAsync(contents,
                  returnFaceAttributes: new List<FaceAttributeType> { FaceAttributeType.Accessories, FaceAttributeType.Age,
            FaceAttributeType.Blur, FaceAttributeType.Emotion, FaceAttributeType.Exposure, FaceAttributeType.FacialHair,
            FaceAttributeType.Gender, FaceAttributeType.Glasses, FaceAttributeType.Hair, FaceAttributeType.HeadPose,
            FaceAttributeType.Makeup, FaceAttributeType.Noise, FaceAttributeType.Occlusion, FaceAttributeType.Smile,
            FaceAttributeType.Smile },
                  detectionModel: DetectionModel.Detection01,
                  recognitionModel: RecognitionModel.Recognition04);

        if (detectedFaces.Count == 0)
            return null;

        var face = detectedFaces[0];

        // Get bounding box of the faces
        Console.WriteLine($"Rectangle(Left/Top/Width/Height) : {face.FaceRectangle.Left} {face.FaceRectangle.Top} {face.FaceRectangle.Width} {face.FaceRectangle.Height}");

        // Get accessories of the faces
        List<Accessory> accessoriesList = (List<Accessory>)face.FaceAttributes.Accessories;
        int count = face.FaceAttributes.Accessories.Count;
        string accessory; string[] accessoryArray = new string[count];
        if (count == 0) { accessory = "NoAccessories"; }
        else
        {
            for (int i = 0; i < count; ++i) { accessoryArray[i] = accessoriesList[i].Type.ToString(); }
            accessory = string.Join(",", accessoryArray);
        }
        Console.WriteLine($"Accessories : {accessory}");

        // Get face other attributes
        Console.WriteLine($"Age : {face.FaceAttributes.Age}");
        Console.WriteLine($"Blur : {face.FaceAttributes.Blur.BlurLevel}");

        // Get emotion on the face
        string emotionType = string.Empty;
        double emotionValue = 0.0;
        Emotion emotion = face.FaceAttributes.Emotion;
        if (emotion.Anger > emotionValue) { emotionValue = emotion.Anger; emotionType = "Anger"; }
        if (emotion.Contempt > emotionValue) { emotionValue = emotion.Contempt; emotionType = "Contempt"; }
        if (emotion.Disgust > emotionValue) { emotionValue = emotion.Disgust; emotionType = "Disgust"; }
        if (emotion.Fear > emotionValue) { emotionValue = emotion.Fear; emotionType = "Fear"; }
        if (emotion.Happiness > emotionValue) { emotionValue = emotion.Happiness; emotionType = "Happiness"; }
        if (emotion.Neutral > emotionValue) { emotionValue = emotion.Neutral; emotionType = "Neutral"; }
        if (emotion.Sadness > emotionValue) { emotionValue = emotion.Sadness; emotionType = "Sadness"; }
        if (emotion.Surprise > emotionValue) { emotionType = "Surprise"; }
        Console.WriteLine($"Emotion : {emotionType}");

        // Get more face attributes
        Console.WriteLine($"Exposure : {face.FaceAttributes.Exposure.ExposureLevel}");
        Console.WriteLine($"FacialHair : {string.Format("{0}", face.FaceAttributes.FacialHair.Moustache + face.FaceAttributes.FacialHair.Beard + face.FaceAttributes.FacialHair.Sideburns > 0 ? "Yes" : "No")}");
        Console.WriteLine($"Gender : {face.FaceAttributes.Gender}");
        Console.WriteLine($"Glasses : {face.FaceAttributes.Glasses}");

        // Get hair color
        Hair hair = face.FaceAttributes.Hair;
        string color = null;
        if (hair.HairColor.Count == 0) { if (hair.Invisible) { color = "Invisible"; } else { color = "Bald"; } }
        HairColorType returnColor = HairColorType.Unknown;
        double maxConfidence = 0.0f;
        foreach (HairColor hairColor in hair.HairColor)
        {
            if (hairColor.Confidence <= maxConfidence) { continue; }
            maxConfidence = hairColor.Confidence; returnColor = hairColor.Color; color = returnColor.ToString();
        }
        Console.WriteLine($"Hair : {color}");

        // Get more attributes
        Console.WriteLine($"HeadPose : {string.Format("Pitch: {0}, Roll: {1}, Yaw: {2}", Math.Round(face.FaceAttributes.HeadPose.Pitch, 2), Math.Round(face.FaceAttributes.HeadPose.Roll, 2), Math.Round(face.FaceAttributes.HeadPose.Yaw, 2))}");
        Console.WriteLine($"Makeup : {string.Format("{0}", (face.FaceAttributes.Makeup.EyeMakeup || face.FaceAttributes.Makeup.LipMakeup) ? "Yes" : "No")}");
        Console.WriteLine($"Noise : {face.FaceAttributes.Noise.NoiseLevel}");
        Console.WriteLine($"Occlusion : {string.Format("EyeOccluded: {0}", face.FaceAttributes.Occlusion.EyeOccluded ? "Yes" : "No")} " +
            $" {string.Format("ForeheadOccluded: {0}", face.FaceAttributes.Occlusion.ForeheadOccluded ? "Yes" : "No")}   {string.Format("MouthOccluded: {0}", face.FaceAttributes.Occlusion.MouthOccluded ? "Yes" : "No")}");
        Console.WriteLine($"Smile : {face.FaceAttributes.Smile}");

        // Get quality for recognition attribute
        //Console.WriteLine($"QualityForRecognition : {face.FaceAttributes.QualityForRecognition}");
        Console.WriteLine();

        return face;
    }

    public async Task<List<SearchTv>> RetrieveMoviesBySentiment(string emotion)
    {
        var client = new TMDbClient(_configuration["Moodflix:TMDbKey"]);

        var movies = await client.GetTrendingMoviesAsync(TimeWindow.Week);

        //client.GetTrendingTvAsync(TimeWindow.Week);

        var genres = await client.GetTvGenresAsync();

        var filters = new List<Genre>();

        switch (emotion.ToLower())
        {
            case "anger":
            case "contempt":
            case "disgust":
                filters.AddRange(genres.Where(c => c.Name.ToLower() == "war & politics"));
                break;
            case "fear":
                filters.AddRange(genres.Where(c => c.Name.ToLower() == "mistery"));
                break;
            case "happiness":
                filters.AddRange(genres.Where(c => c.Name.ToLower() == "comedy" || c.Name.ToLower() == "animation" || c.Name.ToLower() == "family" || c.Name.ToLower() == "action & adventure"));
                break;
            case "neutral":
                filters.AddRange(genres.Where(c => c.Name.ToLower() == "talk" || c.Name.ToLower() == "documentary" || c.Name.ToLower() == "news"));
                break;
            case "sadness":
                filters.AddRange(genres.Where(c => c.Name.ToLower() == "drama"));
                break;
            case "surprise":
                filters.AddRange(genres.Where(c => c.Name.ToLower() == "reality" || c.Name == "action & adventure" || c.Name == "sci-fi & fantasy"));
                break;
        }

         var series = await client.DiscoverTvShowsAsync()
                            .WhereGenresInclude(filters)
                            .Query();

        foreach (var item in series.Results)
        {
            var reviews = await client.GetTvShowReviewsAsync(item.Id);

            foreach (var review in reviews.Results)
            {

            }
        }

        return series.Results;
    }
}
