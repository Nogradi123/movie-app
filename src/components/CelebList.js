import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateCelebrity from './CreateCelebrity';



export default function CelebList() {

    const [celebs, setCelebs] = useState([]);

    const fetchCelebrities = () => {
        axios.get("http://localhost:4200/celebrities/celebrities")
        .then((response) => {
            // console.log(response.data);
            setCelebs(response.data);
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    useEffect(() => {
        fetchCelebrities();
    }, [])

    const deleteCeleb = (theID) =>{
        console.log(theID);
        axios.post("http://localhost:4200/celebrities/remove", {id:theID})
        .then((response)=>{
            console.log(response);
            fetchCelebrities();
        })
        .catch((err)=>{
            console.log(err);
        })
       }

    const listOfCelebs = celebs.map((eachCeleb)=>{
        return(
            <div key={eachCeleb._id} className="animal-list">
                <Link to={"/celebrities/"+eachCeleb._id}>
                    <h3>{eachCeleb.name}</h3>
                </Link>
                <button onClick={() => {deleteCeleb(eachCeleb._id)}}>Delete</button>
            </div>

        )
    })

    return (
        <div>
            <CreateCelebrity fetchCelebrities={fetchCelebrities} />
            {listOfCelebs}
        </div>
    )
}
