using Moodflix.Models;
using Moodflix.Services;
using TMDbLib.Objects.Search;

namespace Moodflix;
public static class RegisterMapRoutes
{
    public static IEndpointRouteBuilder RegisterRoutes(this IEndpointRouteBuilder builder)
    {
        MapAnalyseSentimentFromPhoto(builder);
        MapRetrieveMoviesBySentiment(builder);
        MapRetrieveMoviesById(builder);
        return builder;
    }

    private class SentimentPhotoRequest
    {
        public string base64photo { get; set; }
    }

    private static void MapAnalyseSentimentFromPhoto(IEndpointRouteBuilder builder)
    {
        builder.MapPost("MapAnalyseSentimentFromPhoto", async (SentimentPhotoRequest sentimentPhotoRequest, IMoodflixService service) =>
        {
            if (string.IsNullOrWhiteSpace(sentimentPhotoRequest.base64photo))
            {
                return Results.BadRequest();
            }

            var emotion = await service.AnalyseSentimentFromPhoto(sentimentPhotoRequest.base64photo);

            return Results.Ok(emotion);
        })
        .Produces<string>(StatusCodes.Status200OK)
        .Produces<string>(StatusCodes.Status400BadRequest)
        .RequireCors("AnyOrigin");
    }

    private static void MapRetrieveMoviesBySentiment(IEndpointRouteBuilder builder)
    {
        builder.MapGet("RetrieveMoviesBySentiment", async (string emotion, IMoodflixService service) =>
        {
            var movies = await service.RetrieveMoviesBySentiment(emotion);

            return Results.Ok(movies);
        })
        .Produces<MoviesBySentimentResponse>(StatusCodes.Status200OK)
        .RequireCors("AnyOrigin");
    }

    private static void MapRetrieveMoviesById(IEndpointRouteBuilder builder)
    {
        builder.MapGet("RetrieveMoviesById", async (string id, IMoodflixService service) =>
        {
            var movie = await service.RetrieveMoviesById(id);

            return Results.Ok(movie);
        })
        .Produces<MovieResponse>(StatusCodes.Status200OK)
        .RequireCors("AnyOrigin");
    }
}
