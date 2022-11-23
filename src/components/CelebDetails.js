import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import EditCeleb from './EditCeleb';


export default function CelebDetails() {
    const {id} = useParams();

    const [theCeleb, setTheCeleb] = useState({});

    const fetchCelebDetails = () => {
        axios.get("http://localhost:4200/celebrities/"+id)
        .then((response) => {
            console.log(response.data);
            setTheCeleb(response.data);
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    useEffect(() => {
        fetchCelebDetails();
    }, [])

        return(
            <div>
                <div key={theCeleb._id}>
                    <h3>{theCeleb.occupation}</h3>
                    <h3>{theCeleb.catchPhrase}</h3>
                </div>

                {/* {<EditCeleb />} */}
            </div>

        )


}
