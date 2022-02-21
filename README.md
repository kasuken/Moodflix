<h1 align="center">Moodflix</h1>
<h5 align="center">your mood, our suggestions.</h5><br/>

![Image of Moodflix Project](https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Moodflix/Moodflix_Backdrop_Placeholder.png)

<br/>

## 🎯 About

### Overview of our project
We have started this project with the purpose to participate to the Microsoft Azure Hackathon on dev.to. Our project's goal is to add special features to an existing list of movies.
Imagine yourself at night, thinking about what movie to watch and no title comes to your mind. Well, that's exactly when **Moodflix can help you in identifying the perfect movie** for your night, based on **your actual mood**. 
And after selecting your movie, Moodflix shows you all the movie's reviews with their own mood icon. 
You can also get a global view at a glance to understand whether people have enjoyed it or not.
Go try it and please let us know if you enjoyed it with a ⭐️ - we would really appreciate it.

### Preview video
![](https://github.com/kasuken/Moodflix/blob/main/moodflix.gif?raw=true)

## ▶️ Demo

Here you can find the demo link:

- [Hosted on Azure](https://moodflix.th3wall.codes)

## :sparkles: Features

:heavy_check_mark: &nbsp;&nbsp;Capture your face photo directly from your webcam/phone<br />
:heavy_check_mark: &nbsp;&nbsp;Analyze and display your top emotion from the photo<br />
:heavy_check_mark: &nbsp;&nbsp;Find objects and special objects on your face (beard, glasses, hat, ect.) and display them in our avatar selections<br />
:heavy_check_mark: &nbsp;&nbsp;Display a list of movies based on your mood<br />
:heavy_check_mark: &nbsp;&nbsp;Analyze and display the emotion from the reviews and display an avatar next to each description<br />
:heavy_check_mark: &nbsp;&nbsp;Keywords extraction from the overview of the movies<br />

## :rocket: Technologies

### Frontend
- [TMDb API's](https://www.themoviedb.org/)
- [React](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Context API](https://reactjs.org/docs/context.html)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [React Webcam](https://www.npmjs.com/package/react-webcam)
- [SCSS](https://sass-lang.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Axios](https://www.npmjs.com/package/axios)

### Backend
- [ASP.NET Core 6](https://dotnet.microsoft.com/en-us/apps/aspnet)
- [C# 10](https://docs.microsoft.com/en-us/dotnet/csharp/)
- [.NET 6](https://dotnet.microsoft.com/en-us/learn/dotnet/what-is-dotnet)
- [Azure Cognitive Services SDK](https://azure.microsoft.com/en-us/services/cognitive-services/)
- [Swagger](https://swagger.io/)
- [Microsoft Clarity](https://clarity.microsoft.com/)

### Cloud Services
- [Azure Text Analysis](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/#overview)
- [Azure Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/#overview)

### CI/CD with GitHub Actions

![Moodflix API](https://github.com/kasuken/moodflix/actions/workflows/moodflix-api.yml/badge.svg)
![Moodflix Frontend](https://github.com/kasuken/moodflix/actions/workflows/moodflix-frontend.yml/badge.svg)

To deploy the solution, we use two different [GitHub Actions](https://github.com/kasuken/Moodflix/actions): one for the backend and the other one for the frontend.

## 📸 Screenshots

**Loading page**
![Moodflix Loading page](https://user-images.githubusercontent.com/2757486/154629449-4f2984c8-1702-43f0-b40e-6459231e155a.png)
<br/>

**Landing Page with Webcam**
![image](https://user-images.githubusercontent.com/2757486/154629834-ae146ed5-4859-479b-94f3-9acb3d2aab2f.png)
<br/>

**Results**
![Screenshot of Moodflix results](https://user-images.githubusercontent.com/2757486/154628700-745f6e97-5585-442e-a818-df51162b4386.png)
<br/>

**Movie Details**
![image](https://user-images.githubusercontent.com/2757486/154838027-19f27cc7-a101-4b34-975b-a6bd69469d21.png)
<br/>

<br/>

## 👨🏻‍💻 Run Locally

### Frontend

- Clone the project

```bash
  git clone https://github.com/kasuken/Moodflix
```

- Go to the project directory

```bash
  cd Frontend
```

- Install dependencies

```bash
  npm install
```
- Start the server

```bash
  npm start
```

### Backend

- Clone the project

```bash
  git clone https://github.com/kasuken/Moodflix
```

Go the directory Backend and open the solution with Visual Studio 2022
Press F5 to start the debug session.

## :white_check_mark: Requirements

Before starting 🧑‍💻, you need to have [Git](https://git-scm.com), [Node](https://nodejs.org/en/) and [.NET 6](https://dotnet.microsoft.com/en-us/) installed.
<br/>

## 🧑‍💻 The Team
- Emanuele Bartolesi [(Website)](https://www.emanuelebartolesi.com)
- Davide Mandelli [(GitHub)](https://github.com/th3wall)

## 📝 License

[Apache-2.0 License](https://github.com/kasuken/Moodflix/blob/main/LICENSE)
