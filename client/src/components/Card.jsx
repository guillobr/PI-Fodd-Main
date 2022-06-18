import React from "react";
//import {Link} from 'react-router-dom'
import './Card.css';



export default function Card({name, image, diets, id}){
    return(
        // <div className="recipe">
        //     <h3 className="recipeName">{name}</h3>
        //     <h5 className="dietcointainer ">
        //         {diets? diets.map(diet=>
        //         <li key={diet.name} className="diets">{diet.name}</li>
        //         ): 'Error'}
        //     </h5>
        //     <img className="recipeImg" src={image} alt="img not found" width="200px" heigth="250px"/>        
        // </div>
        <div class='sup'>
        <div class= 'body'>
        <div class='card'>
        <div class='face front'>

             <img src={image} alt="img not found"/>
             <h3>{name}</h3>
             

        </div>
        <div class='face back'>
            <h3>{name}</h3>
            <h5>
                {diets? diets.map(diet=>
                <li key={diet.name} className="diets">{diet.name}</li>
                ): 'Error'}
            </h5>
            <div class='link'>
                <a href={"/recipe/"+id}>Details</a>
            </div>

        </div>
    </div>
    </div>
    </div>
    );
}