namespace Moodflix.Services
{
    public interface IMoodflixService
    {

        public Task<string> AnalyseSentimentFromPhoto(string base64photo);
        public Task<List<string>> RetrieveMoviesBySentiment(string emotion);

    }
}
