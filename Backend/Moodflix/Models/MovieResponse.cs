using TMDbLib.Objects.Movies;
using TMDbLib.Objects.Search;

namespace Moodflix.Models;

public class MovieResponse
{
    public Movie Movie { get; set; }

    public double AverageSentiment { get; set; }

    public List<MovieKeywords> MovieKeywords { get; set; } = new List<MovieKeywords>();

    public List<Review> Reviews { get; set; } = new List<Review>();
}