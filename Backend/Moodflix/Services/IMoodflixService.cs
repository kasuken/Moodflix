using Microsoft.Azure.CognitiveServices.Vision.Face.Models;
using Moodflix.Models;
using TMDbLib.Objects.Search;

namespace Moodflix.Services
{
    public interface IMoodflixService
    {
        Task<DetectedFace> AnalyseSentimentFromPhoto(string base64photo);
        Task<MoviesBySentimentResponse> RetrieveMoviesBySentiment(string emotion);
        Task<MovieResponse> RetrieveMoviesById(string id);
    }
}
