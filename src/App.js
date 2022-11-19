
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
import SignupOrLogin from './components/SignUp';

function App() {

  const [theUser, setTheUser] = useState(null);
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

  const getUserInfo = () => {
    axios.get("http://localhost:4200/serializeuser", {withCredentials: true})
    .then((response) => {
      setTheUser(response.data)
    })
    .catch((err)=> {
      console.log(err);
    })
  }
  
  useEffect(()=>{
    getUserInfo();
  }, [])

  const logout = () =>{
    axios.post("http://localhost:4200/logout",{}, {withCredentials: true})
    .then((response)=>{
      console.log(response.data)
      if(response.data.message === "successfully logged out")setTheUser(null);
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  return (
    <div className="main">
      
      <NavBar />
      
      {!theUser && <div className='login-signup-container'>
        <SignupOrLogin action="signup" getUserInfo={getUserInfo} />
        <SignupOrLogin action="login" getUserInfo={getUserInfo} />
      </div>}

      {theUser && 
        <div>
          <button onClick={logout}
          >Logout</button>
      </div>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesList movies={movies} fetchMovies={fetchMovies} />} />
        <Route path="/movies/create" element={<CreateMovie />} />
        <Route path="/movies/:id" element={<MovieDetails movies={movies}/>} />
        <Route path="/celebrities" element={<CelebList /> } />
        <Route path="/celebrities/:id" element={<CelebDetails />} />
      </Routes>
    </div>
  );
}

export default App;
