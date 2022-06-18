import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from "react-router";
import { getDetail, Remove , cleanRecipe } from '../actions/index';
import { useNavigate} from 'react-router-dom';
import './Detail.css';



export default function Detail(props){
    console.log(props)

const dispatch = useDispatch()
const { id } = useParams();

useEffect(()=>{
    dispatch(getDetail(id));//props.match.params.id
},[dispatch,id])

const myRecipe= useSelector((state)=> state.detail)

 //console.log('soymyRecipe:',myRecipe)
// console.log('soymyRecipeScore:', myRecipe[0].healthScore)
// //console.log('soySteps:',myRecipe[0].steps)
// //console.log('soydiets:',myRecipe.diets)
// var steps= function(){
//     if(myRecipe.steps===undefined){
//          console.log('No tengo steps')
//     }else{
//        console.log('soy steps:',myRecipe.steps)
//     }
// }
// var a = steps()

let navigate = useNavigate();

function handleDelete (e){
    e.preventDefault(e)
    if(myRecipe[0].createInDb===true){
    dispatch(Remove(id))
    alert("Successfully Deleted")
    navigate("../home")}else{
        alert("Sorry, this recipe cant be deleted")
    }
    // navigate("/home")
       // return dispatch(cleanData(id))
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(cleanRecipe());
        navigate("/home");
      }


return(
    <div className="details" >
         
        {
            myRecipe.length>0 
            ?
            
            <div>
                
                <h1  className="title" >{myRecipe[0].name}</h1>

                <div className="divimg">
                    <img className="detailImg" src={myRecipe[0].image} alt='img not found'/>
                    {/* // ? myRecipe[0].image: 
                    // `https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80`} alt='img not found'/> */}
                </div>

                
                <h5  >Summary:</h5>
                    <h2  className="summary">{myRecipe[0].summary.replace(/<[^>]*>/g, '')}</h2>.
                

                <div className="texts">
                    <p  className="scores">HealthScore:{myRecipe[0].healthScore}</p>
                </div>

                <div>

                    <h5  >Steps:</h5>
                    {/* {myRecipe[0].steps.map(step=>
                        <li>{step}</li>
                        )
                    } */}
                    {myRecipe[0].createInDb ? <h5>{myRecipe[0].steps}</h5>:(
                    myRecipe[0].steps ? myRecipe[0].steps.map(step => <p>{step.step}</p>)
                        : <h5>Sorry!!There are no Steps for this Recipe</h5>)}
                         {/* {myRecipe[0].createInDb ? <h5>{myRecipe[0].steps}</h5>:
                     myRecipe.steps.map(step => <li>{step.number}:{step.step}</li>)} */}
                        
                        
                    
              
                </div>

                <div >
                    <p  className="texts">Diets:
                    {myRecipe[0].diets.map(diet=>
                    <li className="diets">{diet.name}</li>
                    )}</p>
                </div>

            </div> 
            : <p>Loading..</p>
        }
        <button className="deleteButton" onClick={(e)=> handleDelete(e)}>Remove</button>
        <button className="backButton" onClick={(e) => handleClick(e)}>Back Home</button>
        {/* <Link to = '/home'>
            <button button className="backButton">Go Back</button>
        </Link> */}
      
      
      
    </div>
)

}




// //RENDER PARA EL SEGUNDO BACK
// return(
//     <div className="details" >
         
//         {
//             myRecipe 
//             ?
            
//             <div>
            
//                 <h1  className="title" >{myRecipe.name}</h1>

//                 <div className="divimg">
//                     <img className="detailImg" src={myRecipe.image} alt='img not found'/>
//                     {/* // ? myRecipe[0].image: 
//                     // `https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80`} alt='img not found'/> */}
//                 </div>

//                 <div className="ddsh">
//                     <h2  className="summary">Summary:{myRecipe.summary}</h2>
//                 </div>

//                 <div className="ddsh">
//                     <p  className="scores">HealthScore:{myRecipe.healthScore}</p>
//                 </div>

//                 <div className="ddsh">
//                     {/* <h5  className="steps">Steps:
//                     {myRecipe.steps.map(step=>
//                         <li>{step}</li>
//                         )
//                     }
//                     </h5> */}
                
//                 </div>
//                 <div>
//                     <h5>Steps:{myRecipe.steps}</h5>
//                 </div>
//                 {/* <div>
//                     <h5>Diets:{myRecipe.diets.map(diet=>{return diet.name})}</h5>
//                 </div> */}

//                 {/* <div className="ddsh">
//                     <h5  className="texts">Diets:
//                     {myRecipe.diets.map(diet=>
//                     <li className="diets">{diet.name}</li>
//                     )}</h5>
//                 </div> */}

//             </div> 
//             : <p>Loading..</p>
//         }
//         <Link to = '/home'>
//             <button button className="backButton">Go Back</button>
//         </Link>
//         <Link to = '/recipeput'>
//             <button id={id} button className="backButton">Modify your recipe</button>
//         </Link>
//         <div>
            
//         </div>
//     </div>
// )

// }





