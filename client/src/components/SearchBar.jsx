import React from 'react';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import {searchRecipesByName} from '../actions';
import './SearchBar.css';

export default function SearchBar({returnToFirstPage}){

    const dispatch = useDispatch()

    const [name,setName] = useState('')


function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
    //console.log(name)
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(searchRecipesByName(name))
    .then(()=>{ returnToFirstPage()})
    setName('')
    
}




    return(
        <div className="search">
            <input className="searchInput"
                type='text'
                placeholder='Search recipe..'
                value={name}
                onChange= {(e)=> handleInputChange(e)}
            />
            <button className="searchButton" 
            type='submit' 
            onClick={(e)=>handleSubmit(e)}>Search Recipe</button>           
        </div>
    )
}