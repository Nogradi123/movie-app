import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MoviesList({movies, fetchMovies}) {

    const deleteMovie = (theID) =>{
        console.log(theID);
        axios.post("http://localhost:4200/movies/remove", {id:theID})
        .then((response)=>{
            console.log(response);
            fetchMovies();
        })
        .catch((err)=>{
            console.log(err);
        })
       }


    const listOfMovies = movies.map((eachMovie) => {
        return (
            <div className='movies' key={eachMovie._id}>
                    <h3>{eachMovie.title}</h3>
                <Link to={"/movies/"+eachMovie._id}>
                    <h6>Check out the details</h6>
                </Link>
                <button onClick={() => {deleteMovie(eachMovie._id)}}>Delete</button>
            </div>
        )
    })

    return (
    <div>
        <Link to={"/movies/create"}>
            <button>Add Movie</button>
        </Link>
        <div className='movie-list'>
            {listOfMovies}
        </div>
    </div>
    )
}