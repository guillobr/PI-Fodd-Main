import React, { useState , useEffect } from 'react';
import { Link} from 'react-router-dom';
import { postRecipe , getDiets } from '../actions/index';
import { useDispatch , useSelector } from 'react-redux';
import './RecipeCreate.css';

function validate(post) {
    let errors = {};//{........}
    if (!post.name) {
        errors.name = 'Please insert a name' 
    } else if(!post.name[0].match(/^[A-Z]/)){
        errors.name='First letter must be a capital letter'
    }
    if (!post.summary) {
        errors.summary = 'Please write a summary'
    }
   
    if (!post.healthScore || post.healthScore < 0 || post.healthScore > 100) {
        errors.healthScore = 'Value must be between 0 and 100'
    }
    if (!post.steps.length) {
        errors.steps = 'Please write some instructions or steps'
    }
    // if (!post.image) {
    //     errors.image = 'Insert url image'
    // }
    if (!post.diets.length) {
        errors.diets = 'Choose unleast one diet'
    }
    return errors;
}


export default function RecipeCreate(){
    
    const dispatch = useDispatch()  
    const alldiets = useSelector((state)=> state.diets)
    const [errors,setErrors] = useState({});
    const [post,setPost] = useState({ 
        name:'',
        summary:'',
        healthScore:'',
        steps:[],
        image:'https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg',
        diets:[]
    })

    useEffect(()=>{
            dispatch(getDiets())
        },[dispatch]);


  

   

    function handleChange(e){     
        setPost({                           
            ...post, 
            [e.target.name] : e.target.value     
        })
        setErrors(validate({
            ...post,                          
            [e.target.name] : e.target.value
        }))     
    }

    function handleSelectDiets(e){ 
        setPost({
            ...post, 
            diets: [...post.diets,e.target.value]       
        })
        setErrors(validate({
            ...post,
            diets: [...post.diets,e.target.value]
        }));
    }

    function handleSteps(e) {
        setPost({
            ...post,
            steps: [e.target.value]
        });
        setErrors(validate({
            ...post,
            steps: e.target.value
        }));
    }

    function handleDietDelete(diet){
        setPost({
            ...post,  
            diets: post.diets.filter(e=>e!==diet)
        })
        setErrors(validate({
            ...post,
            diets: [...post.diets]
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) alert("Please fill in all the fields")
        else {
            dispatch(postRecipe(post))
            alert('¡Recipe Created!')
            setPost({
                name:'',
                summary:'',
                healthScore:'',
                steps:[],
                image:'',
                diets:[]
            })
        }
    };

  
    return(
        <div  className="addRecipe">
            <Link to='/home'><button className="Home">Home</button></Link>
            <h1 className="msg">Create Your Own Recipe!</h1>
            <h2>Please fill in all the fields</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="form">

                    <label className="msgs">Name:</label>
                    <input                    
                    className="inputs"
                    type='text' 
                    value= {post.name} 
                    name= 'name'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
                </div>
 

                <div>
                    <label className="msgs">Summary:</label>
                    <textarea 
                    value= {post.summary} 
                    name= 'summary'
                    onChange={(e)=>handleChange(e)}    
                    />
                     {errors.summary && (
                        <p className="errors">{errors.summary}</p>
                    )}
                </div>


                <div>
                    <label className="msgs">HealthScore::</label>
                    <input 
                    type='number' min='0' max='100' 
                    value= {post.healthScore} 
                    name= 'healthScore'
                    onChange={(e)=>handleChange(e)}    
                    />
                     {errors.healthScore && (
                        <p className="errors">{errors.healthScore}</p>
                    )}
                </div>


                <div>
                    <label  className="msgs">Steps:</label>
                    <textarea 
                    value= {post.steps} 
                    name= 'steps'
                    onChange={(e)=>handleSteps(e)}
                    />
                     {errors.steps && (
                        <p className="errors">{errors.steps}</p>
                    )}
                </div>


                {/* <div>
                        <label className="msgs">Image:</label>
                        <input type="text" value={post.image} name='image' onChange={e => handleChange(e)} />
                         {errors.image && (
                                <p className="errors">{errors.image}</p>
                        )}
                </div> */}


                <select className="checkSelect" onChange={e => handleSelectDiets(e)} defaultValue='default'>
                    <option value="default" disabled className="msgs">Choose Diets</option>
                        {
                            alldiets && alldiets.map(diet => (
                                <option value={diet.name} key={diet.id}  className="dietTypes" >{diet.name}</option>
                                    ))
                        }
                </select>
                        {errors.diets && (
                            <p className="errors">{errors.diets}</p>
                        )}
                        {post.diets.map(diet =>
                            <div key={diet}>
                                <p>{diet}</p>
                                <button onClick={() => handleDietDelete(diet)}>X</button>
                            </div>
                        )}


                <button  className="submitButton" type='submit'>Create Recipe</button>
            </form>
            
        </div>
    )
}



