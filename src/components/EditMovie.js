import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function EditMovie({movies, fetchMovies}) {
    const navigate = useNavigate();
    const {id} = useParams();

    const [formState, setFormState] = useState(movies);

    const updateInput = (e, thingToUpdate) => {
        setFormState({...formState, [thingToUpdate]: e.target.value});
    };

    const submitForm = () =>{
        axios.post("http://localhost:4200/movies/edit/"+id, {
            title: formState.title,
            genre: formState.genre,
            plot: formState.plot,
        
        })
        .then((response)=>{
            fetchMovies();
            navigate('/movies');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

  return (
    <div>
            <div>
                Title:
                <input type="text" value={formState.title} onChange={(e)=>{updateInput(e,"title")}} />
            </div>
            <div>
                Genre:
                <input type="text" value={formState.genre} onChange={(e)=>{updateInput(e,"genre")}} />
            </div>
            <div>
                Plot:
                <input type="text" value={formState.plot} onChange={(e)=>{updateInput(e,"plot")}} />
            </div>
            <button onClick={submitForm}>submit</button>
        </div>
  )
}
