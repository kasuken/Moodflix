<a href="https://moodflix.th3wall.codes">
  <img alt="Moodflix – your mood, our suggestions" src="https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Moodflix/Moodflix_Backdrop_Placeholder.png">
  <h1 align="center">Moodflix</h1>
</a>

<p align="center">
  Your mood, our suggestions.
</p>

<p align="center">
  <a href="https://twitter.com/Th3Wall25">
    <img src="https://img.shields.io/twitter/follow/Th3Wall25?style=flat&label=Th3Wall25&logo=twitter&color=0bf&logoColor=fff" alt="Th3Wall Twitter Profile" />
  </a>
  <a href="https://twitter.com/Kasuken">
    <img src="https://img.shields.io/twitter/follow/Kasuken?style=flat&label=Kasuken&logo=twitter&color=0bf&logoColor=fff" alt="Kasuken Twitter Profile" />
  </a>
</p>

<p align="center">
  <a href="#-about"><strong>About</strong></a> ·
  <a href="#%EF%B8%8F-demo"><strong>Demo</strong></a> ·
  <a href="#sparkles-features"><strong>Features</strong></a> ·
  <a href="#rocket-technologies"><strong>Technologies</strong></a> ·
  <a href="#-screenshots"><strong>Screenshots</strong></a> ·
  <a href="#-run-locally"><strong>Run Locally</strong></a> ·
  <a href="#white_check_mark-requirements"><strong>Requirements</strong></a> ·
  <a href="#-license"><strong>License</strong></a>
</p>
<br/>

## 🎯 About

### Overview of our project
We have started this project with the purpose of participating to the Microsoft Azure Hackathon on dev.to.<br />
Our project's goal is to add special features to an existing list of movies.<br />
Imagine yourself at night, thinking about what movie to watch and no title comes to your mind. Well, that's exactly when **Moodflix can help you in identifying the perfect movie** for your night, based on **your actual mood**. <br />
And after selecting your movie, Moodflix shows you all the movie's reviews with their own mood icon. <br />
You can also get a global view at a glance to understand whether people have enjoyed it or not.<br />
Go try it and please let us know if you enjoyed it with a ⭐️ - we would really appreciate it.<br />

### Preview video
![](https://user-images.githubusercontent.com/2757486/155729585-e89b35be-3799-435e-9de3-bd48bd8ed69d.gif)


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

### Frontend ([Th3Wall](https://github.com/Th3Wall))
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

### Backend ([Kasuken](https://github.com/Kasuken))
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
![Moodflix Loading page](https://user-images.githubusercontent.com/2757486/155728648-e1526067-d45d-455f-978d-22b4608399d6.gif)
<br/>

**Landing Page with Webcam**
![Moodflix Landing page](https://user-images.githubusercontent.com/2757486/154629834-ae146ed5-4859-479b-94f3-9acb3d2aab2f.png)
<br/>

**Results**
![Screenshot of Moodflix results](https://user-images.githubusercontent.com/2757486/155727314-bd6cc96a-1c21-4e71-abcc-2abffca17896.png)
<br/>

**Movie Details**
![Moodflix Details](https://user-images.githubusercontent.com/2757486/155727548-64ffc6b4-1eaf-49b9-b30e-722b713b1a72.png)

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

## 🔮 Repo Analytics
![Alt](https://repobeats.axiom.co/api/embed/74af2c2e3aad026045cbc9ad32b1085d14efd06d.svg "Repobeats analytics image")
