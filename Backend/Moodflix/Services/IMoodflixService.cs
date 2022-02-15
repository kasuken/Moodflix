using Microsoft.Azure.CognitiveServices.Vision.Face.Models;
using TMDbLib.Objects.Search;

namespace Moodflix.Services
{
    public interface IMoodflixService
    {

        public Task<DetectedFace> AnalyseSentimentFromPhoto(string base64photo);
        public Task<List<SearchMovie>> RetrieveMoviesBySentiment(string emotion);

    }
}
