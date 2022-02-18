<h1 align="center">Moodflix</h1>
<h5 align="center">your mood, our suggestions.</h5><br/>

![Image of Moodflix Project](https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Moodflix/Moodflix_Backdrop_Placeholder.png)

<br/>

## 🎯 About

We have started this project with the purpose to partecipate to the [Microsoft Azure Hackthon on dev.to](https://dev.to/devteam/hack-the-microsoft-azure-trial-on-dev-2ne5).


learning how to structure a Web App of a mid-level complexity integrating the Redux logic.<br/>
I've tried to replicate the original layout as much as possible and I've also made some improvements in some sections inserting route animations and micro-interactions. I've also inserted a really close clone of Netflix's original splash animation (forked from a famous [codepen from Claudio Bonfati](https://codepen.io/claudio_bonfati/pen/mdryxPv)), made entirely with CSS, as well as the play animation. I have then sampled the original Netflix "ta-duummm" sound and I made it play along with the two animations.<br/>
I put a lot of effort into it and I hope that you could like it.<br/><br/>
The Web App redirects you to an authentication page, in which you can choose to sign up or to sign in: you can sign in with your custom account or with your Google account. Once you are logged in and after the splash animation, you will land on the homepage, in which you can find a mix of movies and series divided into rows.<br/>
Each row represents a movie/series category: you can click on it and you will be redirected to the selected category, a page that loads thousands of movies with an infinite scroll. You can also navigate to the movies page, series page, new & popular page (that contains the upcoming movies/series and the most popular ones) or you can navigate to your favorites page.<br/>
You can add/remove movies/series through the plus and minus buttons that you can find hovering each poster or opening a single movie's detail modal. If you click on the play button you can enjoy a custom CSS-only play animation with Fakeflix's brand name.<br/>
You have also the option to search through TMDB's catalogue using the search functionality inside the fixed navbar: you can search by movie name, actor or movie director.<br/><br/>
Go try it and please let me know if you enjoyed it with a ⭐️, I would appreciate it a lot.
<br/>

## ▶️ Demo

Here you can find the demo link:

- [Hosted on Azure](https://moodflix.th3wall.codes)

## :sparkles: Features

:heavy_check_mark: &nbsp;&nbsp;Display movies and series, old and upcoming, also from the real Netflix<br />
:heavy_check_mark: &nbsp;&nbsp;Category related page with infinite scroll<br />
:heavy_check_mark: &nbsp;&nbsp;Search by title, actor, movie director<br />
:heavy_check_mark: &nbsp;&nbsp;Add/Remove to/from "My list" functionality<br />
:heavy_check_mark: &nbsp;&nbsp;Detail modal with extra informations about the selected movie/series<br />
:heavy_check_mark: &nbsp;&nbsp;Customized splash animation (credits: [Claudio Bonfati's pen](https://codepen.io/claudio_bonfati/pen/mdryxPv)) with characteristic Netflix sound<br />
:heavy_check_mark: &nbsp;&nbsp;Play animation with characteristic Netflix sound<br />
:heavy_check_mark: &nbsp;&nbsp;Google login<br />
:heavy_check_mark: &nbsp;&nbsp;User Sign In & User Sign Up<br />
:heavy_check_mark: &nbsp;&nbsp;Use of React hooks and custom hooks<br />
:heavy_check_mark: &nbsp;&nbsp;Favourites list persistence (session storage)<br />
:heavy_check_mark: &nbsp;&nbsp;Responsive layout<br />
:heavy_check_mark: &nbsp;&nbsp;Swipeable movies list<br />
:heavy_check_mark: &nbsp;&nbsp;Loading skeletons<br />
:heavy_check_mark: &nbsp;&nbsp;Route animations and micro-interactions (handled with Framer Motion)<br />

## :rocket: Technologies

### Frontend
- [TMDb API's](https://www.themoviedb.org/)
- [React](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Hooks Form](https://react-hook-form.com/)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [Reselect](https://github.com/reduxjs/reselect)
- [SCSS](https://sass-lang.com/)
- [SwiperJS](https://swiperjs.com/react)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

### Backend
- ASP.NET Core 6
- C# 10
- .NET 6
- Azure Cognitive Services SDK
- Swagger
- Microsoft Clarity

### Cloud Services
- Azure Text Analysis
- Azure Face API

### CI/CD with GitHub Actions

To deploy the solution, we use two different [GitHub Actions](https://github.com/kasuken/Moodflix/actions): one for the backend and the other one for the frontend.

<br/>

## 📸 Screenshots

**Loaging page**
![Moodflix Loading page](https://user-images.githubusercontent.com/2757486/154629449-4f2984c8-1702-43f0-b40e-6459231e155a.png)
<br/>

**Landing Page with Webcam**
![image](https://user-images.githubusercontent.com/2757486/154629834-ae146ed5-4859-479b-94f3-9acb3d2aab2f.png)
<br/>

**Results**
![Screenshot of Moodflix results](https://user-images.githubusercontent.com/2757486/154628700-745f6e97-5585-442e-a818-df51162b4386.png)
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

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [Node](https://nodejs.org/en/) and [.NET 6](https://dotnet.microsoft.com/en-us/) installed.
<br/>

## 🧑‍💻 The Team
- Emanuele Bartolesi [website](https://www.emanuelebartolesi.com)
- Davide Mandelli [github](https://github.com/th3wall)

## 📝 License

[Apache-2.0 License](https://github.com/kasuken/Moodflix/blob/main/LICENSE)
