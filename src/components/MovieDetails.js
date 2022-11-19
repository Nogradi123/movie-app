import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function MovieDetails() {
    const {id} = useParams();

    const [theMovie, setTheMovie] = useState({});


    const fetchMovieDetails = () => {
        axios.get("http://localhost:4200/movies/"+id)
        .then((response) => {
            // console.log(response.data)
            setTheMovie(response.data);
        })
    }

    useEffect(() => {
        fetchMovieDetails();
    }, [])

    return (
        <div key={theMovie}>
            <h3>Genre: {theMovie.genre}</h3>
            <h3>Plot: {theMovie.plot}</h3>
            <h3>Cast:</h3>
           <div>
            {theMovie.cast && theMovie.cast.map((castMembers) => {
                    return (
                        <div>
                            <h3>{castMembers.name}</h3>
                        </div>
                    )
                })}
           </div>


        
        </div>
    )
}
