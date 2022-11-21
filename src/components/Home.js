import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SignupOrLogin from './SignUp';


export default function Home() {

  const [theUser, setTheUser] = useState(null);

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
    <div className='home'>
      <div>
        <h1>A Fake IMDB</h1>
      </div>
      {!theUser && <div className='login-signup-container'>
        <SignupOrLogin action="signup" getUserInfo={getUserInfo} />
        <SignupOrLogin action="login" getUserInfo={getUserInfo} />
      </div>}

      {theUser && 
        <div>
          <button onClick={logout}
          >Logout</button>
      </div>}
      
    </div>
  )
}
