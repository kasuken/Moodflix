import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import requests from "./requests";
import instance from "./instance";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Catalogue from "./pages/Catalogue/Catalogue";

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
          <Navbar />
          <Routes>
            <Route path="/camera" element={<Catalogue />} />
            <Route path="/home" element={<Homepage movies={movies} />} />
          </Routes>
        </div>
    );
}

export default App;
