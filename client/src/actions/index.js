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
            var json = await axios.get('http://localhost:3001/recipes?name='+name);
            console.log('soyByname:',json.data)
            return dispatch({
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

export function postRecipe (payload){
    return async function (){
        const json = await axios.post('http://localhost:3001/recipe',payload);
        //console.log(json)
        return json
    }
}

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

export function putRecipe (payload,id){
    return async function (){
        const json = await axios.put('http://localhost:3001/recipe/'+id,payload);
        //console.log(json)
        return json
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