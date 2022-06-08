import React from "react";
//import {Link} from 'react-router-dom'
import './Card.css';



export default function Card({name, image, diets}){
    return(
        <div className="recipe">
            <h3 className="recipeName">{name}</h3>
            <h5 className="dietcointainer ">
                {diets.map(diet=>
                <li key={diet.name} className="diets">{diet.name}</li>
                )}
            </h5>
            <img className="recipeImg" src={image} alt="img not found" width="200px" heigth="250px"/>        
        </div>
    );
}