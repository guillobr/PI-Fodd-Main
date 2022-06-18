
const initialState = {
    recipes : [],
    allRecipesCopy: [],
    diets:[],
    detail:[],  
    delete:[]
}




function rootReducer (state = initialState , action){
    switch(action.type){
        case 'GET_RECIPES' :
            return {
                ...state,
                recipes: action.payload,
                allRecipesCopy: action.payload
            }     

        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }

        case 'SEARCH_RECIPES_BY_NAME':
            return{
                ...state,
                recipes: action.payload
            }  

        case 'POST_RECIPE':
            return {
                ...state
            }

        case 'FILTER_BY_DIETS':
            const recipes = state.allRecipesCopy
            const recipesFilterByDiets =
                recipes.filter(recipe => {
                    let names = recipe.diets.map(diet => diet.name)
                    if (names.includes(action.payload)) 
                    return recipe
                })
            return {
                ...state,
                recipes: recipesFilterByDiets
            }

        case 'ORDER_BY_HEALTH_SCORE':
            const recipesByScore = action.payload === 'asc' ?
                 state.recipes.sort((a, b) => {
                    if (a.healthScore > b.healthScore) return 1;
                    if (b.healthScore > a.healthScore) return -1;
                    return 0;
                 }) 
                :state.recipes.sort((a, b) => { 
                    if (a.healthScore > b.healthScore) return -1;
                    if (b.healthScore > a.healthScore) return 1;
                    return 0;
                });
                return {
                    ...state,
                    recipes: recipesByScore
            }

          

        case 'ORDER_BY_NAME':
            let recipesByOrderName = action.payload === 'ascendent' ?
            state.recipes.sort((a,b)=>{
                if (a.name > b.name)return 1;               
                if(b.name > a.name)return -1;
                return 0
            }) :
            state.recipes.sort((a,b)=>{
                if(a.name>b.name)return -1;
                if(b.name>a.name)return 1;
                return 0
            })
            return {
                ...state,
                recipes: recipesByOrderName
            };

        case 'FILTER_BY_SOURCE':
            const recipesCreate = state.allRecipesCopy
            const recipesC= action.payload === 'true'
            ? recipesCreate.filter(r=>r.createInDb===true)
            : recipesCreate.filter(r=>r.createInDb===false)
            return{
                ...state,
                recipes: recipesC
            }


        case 'GET_DETAILS':
            return({
                ...state,
                detail:action.payload
            })

        case 'POST':
            return({
                ...state,
                recipes:[...state.recipes,action.payload],
                allRecipesCopy:[...state.allRecipesCopy,action.payload]                        
            })

        case 'DELETE':
            return{
                ...state,
                delete:action.payload,
            } 

        case 'CLEAN_DETAIL':
            return({
                ...state,
                detail:{}
            })

            default:
                return state;
    }    
}

export default rootReducer;