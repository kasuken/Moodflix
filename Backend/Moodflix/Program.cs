using Microsoft.OpenApi.Models;
using Moodflix;
using Moodflix.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => options.SwaggerDoc("v1", new OpenApiInfo()
{
    Description = "Moodflix API",
    Title = "Moodflix API",
    Version = "v1",
    Contact = new OpenApiContact()
    {
        Name = "Emanuele Bartolesi & Davide Mandelli",
        Url = new Uri("https://github.com/kasuken/Moodflix")
    }
}));
builder.Services.AddCors(options => options.AddPolicy("AnyOrigin", o => o.AllowAnyOrigin()));

builder.Services.AddMoodflixServices();

var app = builder.Build();

app.UseCors();

//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Moodflix API v1");
        c.RoutePrefix = string.Empty;
    });
//}

app.UseHttpsRedirection();

app.RegisterRoutes();

app.Run();