namespace Moodflix.Services
{
    public class MoodflixService : IMoodflixService
    {
        public Task<string> AnalyseSentimentFromPhoto(string base64photo)
        {
            throw new NotImplementedException();
        }

        public Task<List<string>> RetrieveMoviesBySentiment(string emotion)
        {
            throw new NotImplementedException();
        }
    }
}
