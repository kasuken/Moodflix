import {useEffect, useState} from "react";
import requests from "./requests";
import instance from "./instance";

function App() {
    const [ movies, setMovies ] = useState()
    useEffect(() => {
        instance.get(requests.fetchTrendingAll)
            .then(res => {
                setMovies(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="App">
          <h1>Hello Moodflix-er</h1>
            {
                movies && movies.map(movie => (
                    <p key={movie.id}>{movie.title}</p>
                ))
            }
        </div>
    );
}

export default App;
