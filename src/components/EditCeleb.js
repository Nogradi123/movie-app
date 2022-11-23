import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function EditCeleb(props) {
    const navigate = useNavigate();
    const {id} = useParams();

    const [formState, setFormState] = useState(props.celebs);

    const updateInput = (e, thingToUpdate) => {
        setFormState({...formState, [thingToUpdate]: e.target.value});
    };

    const submitForm = () =>{
        axios.post("http://localhost:4200/celebrities/edit/"+id, {
            name: formState.name,
            occupation: formState.occupation,
            catchPhrase: formState.catchPhrase,
        
        })
        .then((response)=>{
            props.fetchCelebrities();
            navigate('/celebrities');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

return (
    <div>
            <div>
                Title:
                <input type="text" value={formState.name} onChange={(e)=>{updateInput(e,"name")}} />
            </div>
            <div>
                Genre:
                <input type="text" value={formState.occupation} onChange={(e)=>{updateInput(e,"occupation")}} />
            </div>
            <div>
                Plot:
                <input type="text" value={formState.catchPhrase} onChange={(e)=>{updateInput(e,"catchPhrase")}} />
            </div>
            <button onClick={submitForm}>submit</button>
        </div>
)
}
