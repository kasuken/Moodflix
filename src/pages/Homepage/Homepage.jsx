import "./homepage.scss";

const Homepage = props => {
  const { movies } = props;

  return (
    <div className="homepage">
      <h1>Hello Moodflixer</h1>
      {movies && movies.map(movie => (
        <p key={movie.id}>{movie.title || movie.name}</p>
      ))}
    </div>
  )
}

export default Homepage;