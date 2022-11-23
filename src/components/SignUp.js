import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupOrLogin({action, getUserInfo}) {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        username: "",
        password: ""
    });

    const updateInput = (e, thingToUpdate)=>{
        setFormState({...formState, [thingToUpdate]: e.target.value})
    }

    
    const submitSignupForm = () =>{
        let endpoint;
        if(action ==="signup") endpoint = "signup";
        if(action ==="login") endpoint = "login"

        axios.post("http://localhost:4200/"+endpoint, {
            username: formState.username,
            password: formState.password
        },
        {withCredentials: true}
        )
        .then((response)=>{
            getUserInfo();
            navigate('/')
        })
        .catch((err)=>{
            console.log(err);
        })

    }


    return(

    <div className={action}>
        {action === "signup" ? "Signup" : "Login"}
        <br />
        <div>
            <input type="text" value={formState.username} onChange={(e)=>{updateInput(e, "username")}} placeholder= " Enter Username" />
        </div>
        <div>
            <input type="text" value={formState.password} onChange={(e)=>{updateInput(e, "password")}} placeholder="Enter Password"/>
        </div>
        <button onClick={submitSignupForm}>Submit</button>
    </div>
    )
}
