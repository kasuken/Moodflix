using Moodflix.Services;

public static class ServicesExtensions
{
    public static IServiceCollection AddMoodflixServices(this IServiceCollection services)
    {
        services.AddScoped<IMoodflixService, MoodflixService>();
        return services;
    }
}

