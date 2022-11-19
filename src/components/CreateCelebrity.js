import React from 'react';
import { useState } from 'react';
import axios from 'axios'

export default function CreateCelebrity(props) {

    const [formState, setFormState] = useState({
        name: "", 
        occupation: "",
        catchPhrase: ""
    });


    const updateInput = (e, thingToUpdate)=>{
        setFormState({...formState, [thingToUpdate]: e.target.value})
    }


    const sendLocationInfo = ()=>{
        console.log(formState);
        axios.post("http://localhost:4200/celebrities/create",{
            name: formState.name,
            occupation: formState.occupation,
            catchPhrase: formState.catchPhrase,
        }).then((response)=>{

            props.fetchCelebrities();

        }).catch((err)=>{
            console.log(err);
        })
    }


    



    return(
        <div>
            <h3>Add a Celebrity</h3>
            <div>
                Name
                <input type="text" value={formState.name} onChange={(e)=>{updateInput(e,"name")}} />
            </div>
            <div>
                Occupation
                <input type="text" value={formState.occupation} onChange={(e)=>{updateInput(e,"occupation")}} />
            </div>
            <div>
                Catch Phrase
                <input type="text" value={formState.catchPhrase} onChange={(e)=>{updateInput(e,"catchPhrase")}} />
            </div>
            <button onClick={sendLocationInfo} >Submit</button>
        </div>
    )
}
