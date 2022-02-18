using Azure;
using Azure.AI.TextAnalytics;
using Microsoft.Azure.CognitiveServices.Vision.Face;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;
using Moodflix.Models;
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

        // Get accessories of the faces
        var accessoriesList = (List<Accessory>)face.FaceAttributes.Accessories;
        int count = face.FaceAttributes.Accessories.Count;
        string accessory; string[] accessoryArray = new string[count];
        if (count == 0) { accessory = "NoAccessories"; }
        else
        {
            for (int i = 0; i < count; ++i) { accessoryArray[i] = accessoriesList[i].Type.ToString(); }
            accessory = string.Join(",", accessoryArray);
        }

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

        // Get hair color
        var hair = face.FaceAttributes.Hair;
        string color = null;
        if (hair.HairColor.Count == 0) { if (hair.Invisible) { color = "Invisible"; } else { color = "Bald"; } }
        var returnColor = HairColorType.Unknown;
        double maxConfidence = 0.0f;
        foreach (HairColor hairColor in hair.HairColor)
        {
            if (hairColor.Confidence <= maxConfidence) { continue; }
            maxConfidence = hairColor.Confidence; returnColor = hairColor.Color; color = returnColor.ToString();
        }

        return face;
    }

    public async Task<MoviesBySentimentResponse> RetrieveMoviesBySentiment(string emotion)
    {
        var result = new MoviesBySentimentResponse();

        AzureKeyCredential credentials = new AzureKeyCredential(_configuration["Moodflix:TextAnalysisKey"]);
        Uri endpoint = new Uri(_configuration["Moodflix:TextAnalysisEndpoint"]);
        var clientAnalyticsClient = new TextAnalyticsClient(endpoint, credentials);

        var client = new TMDbClient(_configuration["Moodflix:TMDbKey"]);

        var genres = await client.GetMovieGenresAsync();
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
                //filters.AddRange(genres.Where(c => c.Name.ToLower() == "talk" || c.Name.ToLower() == "documentary" || c.Name.ToLower() == "news"));
                filters.AddRange(genres.Where(c => c.Name.ToLower() == "talk" || c.Name.ToLower() == "news"));
                break;
            case "sadness":
                filters.AddRange(genres.Where(c => c.Name.ToLower() == "drama"));
                break;
            case "surprise":
                filters.AddRange(genres.Where(c => c.Name.ToLower() == "reality" || c.Name == "action & adventure" || c.Name == "sci-fi & fantasy"));
                break;
        }

        var movies = await client.DiscoverMoviesAsync()
                           .IncludeWithAllOfGenre(filters)
                           .IncludeAdultMovies(false)
                           .Query();

        var results = movies.Results;

        var sorted = results.OrderBy(a => Guid.NewGuid()).ToList();
        results.Clear();
        results.AddRange(sorted);

        foreach (var item in results)
        {
            if (!string.IsNullOrEmpty(item.Overview))
            {
                var keywords = new MovieKeywords();

                keywords.MovieId = item.Id;
                keywords.Keywords = KeyPhraseExtraction(clientAnalyticsClient, item.Overview);

                result.MovieKeywords.Add(keywords);
            }
        }

        result.Movies = movies.Results;

        return result;
    }

    public async Task<MovieResponse> RetrieveMoviesById(string id)
    {
        var result = new MovieResponse();

        AzureKeyCredential credentials = new AzureKeyCredential("471e171d196a4ddebe606f3569b0ad43");
        Uri endpoint = new Uri("https://moodflix-textanalysis.cognitiveservices.azure.com/");
        var clientAnalyticsClient = new TextAnalyticsClient(endpoint, credentials);

        var client = new TMDbClient(_configuration["Moodflix:TMDbKey"]);

        var movie = await client.GetMovieAsync(id);

        if (!string.IsNullOrEmpty(movie.Overview))
        {
            var keywords = new MovieKeywords();

            keywords.MovieId = movie.Id;
            keywords.Keywords = KeyPhraseExtraction(clientAnalyticsClient, movie.Overview);

            result.MovieKeywords.Add(keywords);
        }

        var reviews = await client.GetMovieReviewsAsync(movie.Id);

        foreach (var review in reviews.Results)
        {
            if (review.Content.Length > 5000) continue;

            var sentiment = SentimentExtraction(clientAnalyticsClient, review.Content);

            var newReview = new Review();
            newReview.Sentiment = sentiment.Sentiment.ToString();
            newReview.Author = review.AuthorDetails.Name;
            newReview.AuthorAvatar = review.AuthorDetails.AvatarPath;
            newReview.Content = review.Content;
            newReview.ConfidentScores.Negative = sentiment.ConfidenceScores.Negative;
            newReview.ConfidentScores.Positive = sentiment.ConfidenceScores.Positive;
            newReview.ConfidentScores.Neutral = sentiment.ConfidenceScores.Neutral;

            result.Reviews.Add(newReview);
        }

        result.Movie = movie;

        return result;
    }

    private List<string> KeyPhraseExtraction(TextAnalyticsClient client, string phrase)
    {
        var result = new List<string>();
        var response = client.ExtractKeyPhrases(phrase);

        foreach (string keyphrase in response.Value)
        {
            result.Add(keyphrase.ToLower());
        }

        return result;
    }

    private DocumentSentiment SentimentExtraction(TextAnalyticsClient client, string sentence)
    {
        var response = client.AnalyzeSentiment(sentence);
        return response;
    }
}

public static class Extensions
{
    public static IEnumerable<T> Randomize<T>(this IEnumerable<T> source)
    {
        Random rnd = new Random();
        return source.OrderBy((item) => rnd.Next());
    }
}
