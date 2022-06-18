import axios from "axios";

export function getRecipes(){
    return async function (dispatch){
    var json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type:'GET_RECIPES',
            payload: json.data
        })
    }    
}

export function searchRecipesByName(name){
    return async function(dispatch){
        try {                                                //pokemos?name=${name}
            var json = await axios.get('http://localhost:3001/recipes?name='+name);//[{pikachu}]
            //console.log('soyByname:',json.data)
            return dispatch({//--->[{recetas}]
                type: 'SEARCH_RECIPES_BY_NAME',
                payload: json.data
            })
            
        } catch (error) {
            console.log(error)
            
        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/types');
        return dispatch({ 
            type: 'GET_DIETS', 
            payload: json.data })
    }
}

export function postRecipe (payload){//{pokemon} <-- form-->body
    return async function (dispatch){//redux magia
       const json = await axios.post('http://localhost:3001/recipe',payload);//json.data
        //console.log('soy json:',json)
        return dispatch({
            type:'POST',
            payload: json.data
        })
    }
}

// export function postRecipe (payload){//---> payload({receta})---> cree en BD
//     return async function (){
//         const json = await axios.post('http://localhost:3001/recipe',payload);      
//       return json
//     }
// }

export function filterRecipesByDiets(payload){
    //console.log(payload)
    return {
        type: 'FILTER_BY_DIETS',
        payload
    }
}

export function orderByHealthScore(payload){
    return{
        type: 'ORDER_BY_HEALTH_SCORE',
        payload: payload
    }
}

export function filterBySource(payload){
    return{
        type: 'FILTER_BY_SOURCE',
        payload: payload
    }
}


export function orderByName(payload) {
    return { 
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            var json = await axios.get('http://localhost:3001/recipes/'+id)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export  function Remove(id){
    return async function(dispatch){
       var json = await axios.delete(`http://localhost:3001/recipe/delete/${id}`)
       //console.log('soy delete:',json.id)
       return dispatch({
           type:'DELETE',
           payload: json.id
       })
    }
}


export function cleanRecipe(){
    return{
        type:'CLEAN_DETAIL',
        payload: {}
    }
}



















/*
TEORIA

Si es asincrona retorna una funcion
export function name(){
    return funtion(dispatch)  --> esto es por arte de magia de redux, recibe como parametro el dispatch que es la capacidad de poder despachar unaaccion
}

Si no un objeto
export function name(x){
    return {
        action
    }
}

FETCH: recibe un objeto json que hay que convertirlo en un objeto java script primero
AXIOS: lo convierte automaticamente, pero tiene que acceder al .data, porque axios devuelve un objeto con metadaDatos
       y la info puntual que devuelve el servidor esta en una propiedad que se llama .data
*/