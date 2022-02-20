
### Overview of our project
We have started this project with the purpose to participate to the Microsoft Azure Hackathon on dev.to. Our project's goal is to add special features to an existing list of movies.
Imagine yourself at night, thinking about what movie to watch and no title comes to your mind. Well, that's exactly when **Moodflix can help you in identifying the perfect movie** for your night, based on **your actual mood**. 
And after selecting your movie, Moodflix shows you all the movie's reviews with their own mood icon. 
You can also get a global view at a glance to understand whether people have enjoyed it or not.
Go try it and please let us know if you enjoyed it with a ⭐️ - we would really appreciate it.

### Preview video
![how it works video](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g53nbfxeth9phpavoi42.gif)

### Submission Category: 
The category for this project is: **AI Aces**.
We are using **Azure Face API** and **Azure Text Analytics**.

In addition, to publish the frontend we are using an **Azure Static Webapp** and for the backend an Azure App Service.

We have implemented CI/CD with **GitHub Actions**.

### GitHub Repository

We started with the first commit after the first two days of the hackathon.
We hadn't started it prior to the hackathon - this is a brand new project made for this challenge.
We discussed about the topic of the application and this amazing idea came to our mind.
Give a ⭐ on the project for future updates (we have a lot of ideas to implement in the near future).

{% github https://github.com/kasuken/Moodflix %}

### Behind the scenes
The frontend is written in **React 17.0.2** and **SASS**.
From the homepage of the application, we capture your picture on-the-fly from your webcam (we use a specific NPM package for it) and we send the image as a base64 string directly to the Backend, through an API.

The backend is written in **.NET 6** and more specifically **ASP.NET Core 6** and Minimal API.
We don't store anything in our application (we don't have any database or storage).
The API receives the base64 string image from the Frontend and sends it to the Azure Face API directly (we are using the **Azure SDK** for the **Face API**: it's a preview version on NuGet).
We don't add any logic on the reply we get from Azure. It's the Backend itself which sends all details of the detected face to the Frontend again (e.g. beard, glasses, objects, emotion, etc.).
The Frontend elaborates the request and sends the next request to the Backend with the calculated mood (e.g. happiness, anger, sadness, etc..).
With our own logic we call the **TMDB API** from the Backend to get a list of movies based on the user mood.
The Frontend displays the results and whenever the user clicks on one of the movie's posters, the details page appears.

How do we retrieve the data? The Frontend calls the API on the server while in the Backend we retrieve the reviews from the TMDB API and we send them to the **Azure Text Analytics** API. 
We do also send the overview of the movie together.
The Azure service gives us back the reviews' emotions and keywords and we show them all with the UI.

### Azure resources
This is the list of our services deployed on Azure
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nt7cus2g01qbfop6scu9.png) 

For the Text Analytics we use "France Central" as it's still not available in Western Europe.
I think it should be a temporary issue.

### The working workflow
To work on this project we use the [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow.
I use this workflow for all my current day-to-day projects and I like it a lot.
We haven't been working together neither at the same time on this project. 
I have been the "early-morning-bird" on it, while Davide has been the "nocturnal-owl".
I am sure this can be a great example of how developers can easily and effectively work on the same project from remote and on different time zones if needed. 
What's important is to set goals and tasks in a precise and clear way and by using the right tools.

### CI/CD
We have automated the builds through CI/CD thanks to two GitHub Actions.
![GitHub Actions](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/etxvvbne6w4oyjwx2z9y.png)
```yaml
name: Moodflix-Frontend

on:
  push:
    branches: [ main ]
    paths: [ 'Frontend/**' ]

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_HAPPY_HILL_0BA50CF03 }}
          repo_token: ${{ secrets.GITHUB_TOKEN }} # Used for Github integrations (i.e. PR comments)
          action: "upload"
          ###### Repository/Build Configurations - These values can be configured to match your app requirements. ######
          # For more information regarding Static Web App workflow configurations, please visit: https://aka.ms/swaworkflowconfig
          app_location: "/Frontend/" # App source code path
          api_location: "" # Api source code path - optional
          output_location: "build" # Built app content directory - optional
          ###### End of Repository/Build Configurations ######

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_HAPPY_HILL_0BA50CF03 }}
          action: "close"
```

This is an example of the Frontend action.
In both actions we push everything to the production environment after a commit on the "main" branch.
In addition, we apply a filter to the action based on the folder which contains the source of both Frontend and Backend.
We then publish the under changes project only.

### Screenshots
**Loading page**
![Moodflix Loading page](https://user-images.githubusercontent.com/2757486/154629449-4f2984c8-1702-43f0-b40e-6459231e155a.png)

**Landing Page with Webcam**
![image](https://user-images.githubusercontent.com/2757486/154629834-ae146ed5-4859-479b-94f3-9acb3d2aab2f.png)

**Results**
![Screenshot of Moodflix results](https://user-images.githubusercontent.com/2757486/154628700-745f6e97-5585-442e-a818-df51162b4386.png)

**Movie Details**
![image](https://user-images.githubusercontent.com/2757486/154838027-19f27cc7-a101-4b34-975b-a6bd69469d21.png)

### Our Team
The repo is on my [GitHub profile](https://github.com/kasuken/Moodflix), but we work on the project in a team of two.
The members are [kasuken](dev.to/kasuken) and [th3wall](dev.to/th3wall). 

![Emanuele Bartolesi](https://res.cloudinary.com/practicaldev/image/fetch/s--jGcd7fm---/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/79932/3baae0d1-ee92-4868-8850-5434999f2518.png)
Emanuele is a **Microsoft 365 Architect** at SoftwareONE and he loves to share his love for the technologies through several platforms, like Twitch, his blog, and LinkedIn.
He has been responsible for the backend of this project, written in ASP.NET Core 6 Minimal API and the whole logic for Azure AI.

![Davide Mandelli](https://res.cloudinary.com/practicaldev/image/fetch/s--DiGsTlDm--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/140728/2b1da2e6-75eb-48cd-96ac-09ab855b54be.jpeg)
Davide is a **Frontend Engineer** and he is well-known for his famous repository [Fakeflix](https://github.com/th3wall/fakeflix) on GitHub.
He has been responsible for the whole UI of this project, starting from the design of the logo up to every line of code in React.
