
import './App.css';
import MoviesList from './components/MoviesList';
import { useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import MovieDetails from './components/MovieDetails';
import CelebList from './components/CelebList';
import Home from './components/Home';
import NavBar from './components/NavBar';
import CelebDetails from './components/CelebDetails';
import CreateMovie from './components/CreateMovie';


function App(props) {


  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    axios.get("http://localhost:4200/movies/movies")
    .then((response) => {
        setMovies(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <div className="main">
      
      <NavBar />
      


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesList movies={movies} fetchMovies={fetchMovies} />} />
        <Route path="/movies/create" element={<CreateMovie />} />
        <Route path="/movies/:id" element={<MovieDetails movies={movies} fetchMovies={fetchMovies}/>} />
        <Route path="/celebrities" element={<CelebList /> } />
        <Route path="/celebrities/:id" element={<CelebDetails celebs={props.celebs} fetchCelebs={props.fetchCelebs}/>} />
      </Routes>
    </div>
  );
}

export default App;
