import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateMovie() {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        title: "",
        genre: "",
        plot: "",
       
    })

    const updateInput = (e, thingToUpdate)=>{
        setFormState({...formState, [thingToUpdate]: e.target.value})
    }

    const submitForm = () =>{
        console.log(formState);
        axios.post("http://localhost:4200/movies/create", {
            title: formState.title,
            genre: formState.genre,
            plot: formState.plot,
            

        })
        .then((response)=>{
            console.log(response);
            navigate("/movies");
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
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
            {/* <div>
                Cast:
                <input type="text" value={formState.cast} onChange={(e)=>{updateInput(e,"cast")}} />
            </div> */}
    
            <button onClick={submitForm}>submit</button>
        </div>
    )
}