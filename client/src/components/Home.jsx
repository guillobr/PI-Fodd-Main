import React from 'react';
import { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { getRecipes, getDiets, filterRecipesByDiets, orderByHealthScore , orderByName } from '../actions';
import { Link }  from 'react-router-dom';
import  Card  from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import './Home.css';


export default function Home(){

const dispatch = useDispatch() 
const allRecipes = useSelector(state => state.recipes) 
const diets = useSelector(state => state.diets);
const [order,setOrder] = useState(true)


useEffect(()=> {
    dispatch(getRecipes())
},[dispatch]) 


useEffect(() => {
    dispatch(getDiets());
}, [dispatch])


const [currentPage,setCurrentPage] = useState(1);
const [recipesPerPage,setRecipesPerPage] = useState(9);
const indexOfLastRecipe = currentPage * recipesPerPage;
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)

const paginado = (pagNumber) => {
    setCurrentPage(pagNumber)
}

console.log('soyCurrent:',currentRecipes)
function handleClick(e){
    e.preventDefault();  
    dispatch(getRecipes());
}

function handleFilterByDiets(e){
   // e.preventDefault();
    dispatch(filterRecipesByDiets(e.target.value))  
    setCurrentPage(1)
}

function handleOrderByHealthScore(e) {
    dispatch(orderByHealthScore(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
};

function handleOrderByName(e) {
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
  setOrder(`Ordenado ${e.target.value}`)
};

function returnToFirstPage() {
    setCurrentPage(1)
}


return (
    <div className = "home">
        <Link to="/create">
            <button className="addButton">Create Your Own Recipe</button>
        </Link>
        <h1 className="initialMsg">RECIPES</h1>
        
        <button 
            className="refreshButton" 
            onClick ={e=>handleClick(e)}>
            Refresh Recipes
        </button>
        
        <div >
            <div className="filters">
                <select className="select" onChange={e => handleOrderByName(e)} defaultValue='default'>
                    <option value="default" disabled >Alphabetical Order</option>
                    <option value="ascendent">A-Z</option>
                    <option value="descendent">Z-A</option>
                </select>
           
                <select className="select" onChange={e => handleOrderByHealthScore(e)} defaultValue='default'>
                    <option value="default" disabled >Order by score</option>
                    <option value="desc">Higher</option>
                    <option value="asc">Lower</option>
                </select>

                
            
                <select className="select" onChange={e => handleFilterByDiets(e)} defaultValue='default'>
                    <option value='default' disabled>Select by Diet</option>
                        {
                            diets && diets.map(diet=>(
                            <option value={diet.name} key={diet.id}>{diet.name}</option> 
                        ))
                        }
                </select>
            </div>

                <Paginado 
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes?.length}
                paginado={paginado}/>

           


            <div>
           
                <SearchBar returnToFirstPage={returnToFirstPage} />         
            </div >
        
            <div className="allrecipes">
                {
                currentRecipes.length  //[]
                ? currentRecipes.map(recipe=>{
                    return(
                        <Link to={"/recipe/"+recipe.id}>
                            <Card className="eachRecipe" name={recipe.name} image={recipe.image} diets={recipe.diets} createInDb={recipe.createInDb} key={recipe.id}/>
                        </Link>
                    )               
                    })
                : <h5>Recipe Not Found!</h5>
                }
            </div>
        </div>
    </div>
    
)
}



// <option value="default" disabled >Select By Diet</option>
//                 <option value = 'Gluten Free'>Gluten Free</option>
//                 <option value = 'Ketogenic'>Ketogenic</option>
//                 <option value = 'Vegetarian'>Vegetarian</option>
//                 <option value = 'Lacto Vegetarian'>Lacto Vegetarian</option>
//                 <option value = 'Ovo Vegetearian'>Ovo Vegetearian</option>
//                 <option value = 'Vegan'>Vegan</option>
//                 <option value = 'Paleolithic'>Paleolithic</option>
//                 <option value = 'Pescetarian'>Pescetarian</option>
//                 <option value = 'Primal'>Primal</option>
//                 <option value = 'Low Fodmap'>Low Fodmap</option>
//                 <option value = 'Whole 30'>Whole 30</option>




