using TMDbLib.Objects.Search;

namespace Moodflix.Models;

public class MoviesBySentimentResponse
{
    public List<SearchMovie> Movies { get; set; }

    public double AverageSentiment { get; set; }

    public List<MovieKeywords> MovieKeywords { get; set; } = new List<MovieKeywords>();

    public List<Review> Reviews { get; set; } = new List<Review>();
}

public class MovieKeywords
{
    public int MovieId { get; set; }
    public List<string> Keywords { get; set; } = new List<string>();
}

public class Review
{
    public int MovieId { get; set; }
    public string Author { get; set; }
    public string AuthorAvatar { get; set; }
    public string Content { get; set; }
    public string Sentiment { get; set; }

    public ConfidentScores ConfidentScores { get; set; } = new ConfidentScores();
}

public class ConfidentScores
{
    public double Negative { get; set; }

    public double Neutral { get; set; }

    public double Positive { get; set; }    
}