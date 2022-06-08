
const initialState = {
    recipes : [],
    allRecipesCopy: [],
    diets:[],
    detail:[],
    
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
            const recipes = state.allRecipesCopy//-->[100]
            const recipesFilterByDiets = //-->[20]
                recipes.filter(recipe => {
                    let names = recipe.diets.map(diet => diet.name)//-->[ove,vegano,paleo]
                    if (names.includes(action.payload)) //carnivoro
                    return recipe
                })
            return {
                ...state,
                recipes: recipesFilterByDiets//-->[20]
            }

        case 'ORDER_BY_HEALTH_SCORE':
            const recipesByScore = action.payload === 'asc' ?
                 state.recipes.sort((a, b) => {//7,3,5-->3,7,5--> 3,5,7
                    if (a.healthScore > b.healthScore) return 1;//a=2 b=1--> b,a-->1,2
                    if (b.healthScore > a.healthScore) return -1;//b=2 a=1--> a,b-->1,2
                    return 0;
                 }) 
                //state.recipes.sort((a,b)=>{return a-b})
                // :state.recipes.sort((a,b)=>{return a+b})
                :state.recipes.sort((a, b) => { //4,2,5--> 4,5,2--> 5,4,2
                    if (a.healthScore > b.healthScore) return -1;//a=2 b=1--> a,b-->2,1
                    if (b.healthScore > a.healthScore) return 1;//b=2 a=1--> b,a-->2,1
                    return 0;
                });
                return {
                    ...state,
                    recipes: recipesByScore
            }
            //SORT --> -1 --> a,b
          //      -->  1---->b,a

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


        case 'GET_DETAILS':
            return({
                ...state,
                detail:action.payload
            })

            default:
                return state;
    }    
}

export default rootReducer;