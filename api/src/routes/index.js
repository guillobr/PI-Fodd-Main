const { Router } = require('express');  //requerido
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require ('axios'); //---> como es un modulo no necesita un path, directamente se lo llama con comillas ''
//APUNTE: en models tengo la funcion que crea el modelo
// pero en db lo estoy conectando con sequelize
//entonces si lo necesito lo traigo de ahi

const { Recipe , Diet , Recipe_Diet } = require ('../db')

//Traigo de sequelize operadores que necesito
const {Op} = require ('sequelize');

//Importo todos los routers


//require('dotoenv').config();

const { YOUR_API_KEY } = process.env


const router = Router(); //aclarado

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// BACK1
    
/*
infoapi-->promesa--->resueve o rechaza
.then(succeshandle , errorhandle)
.then(res=>res.map(e=>{name:x}return{}) )
.then(null, eeeeee) === .catch(e)




*/

const getApiInfo = async () =>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`);
    const apiInfo = apiUrl.data.results.map(el => {
        return {
            id: el.id,
            name : el.title,
            summary: el.summary,
            image: el.image,
            healthScore : el.healthScore,
            createInDb: false,
            diets : el.diets.map(dieta=>{return{name:dieta}}),
            steps:el.analyzedInstructions[0]?.steps.map(step => {
                return{
                    number: step.number, 
                    step: step.step,
                }}),          
        }
    }); 
    return apiInfo
};


const getDbInfo = async () =>{
    return await Recipe.findAll({//BD----> receta
        include:{
        model: Diet,
        attributes: ['name'],
        through: {
            attributes : [],
        }
    }
    })  
};

const getAllRecipes =async() =>{
    const apiInfo = await getApiInfo();
    //console.log(apiInfo)
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    //console.log('esto:'+infoTotal)
    return infoTotal
};


router.get('/recipes', async (req,res) =>{
    const { name } = req.query             
    let recipesTotal = await getAllRecipes();
    //console.log(recipesTotal.map(recipe=>recipe.toJSON()))
    if(name){
        let recipeName = await recipesTotal.filter(recipe=>recipe.name.toLowerCase().includes(name.toLowerCase()))
       // console.log('recipeName:',recipeName)
        //recipeName.length 
         res.status(200).send(recipeName)//---->[{receta}] || []
       // : res.status(404).send('Recipe not found')//--->Recipe not found'
    }else{
        res.status(200).send(recipesTotal)//[{recetas}]
    }
});



router.get('/types', async (req,res)=>{
    const tiposdeDieta = ['gluten free', 'ketogenic', 'dairy free', 'vegetarian', 'lacto vegetarian','ovo vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30'];
    tiposdeDieta.forEach(dieta => {
        Diet.findOrCreate({
            where: { name : dieta}
        })
    });
    const allDiets = await Diet.findAll();
    res.send(allDiets);
});




router.post('/recipe', async (req,res)=>{
    const { name , summary , healthScore ,  steps, image, diets, createInDb} = req.body;
   try{  const recetaCreada = await Recipe.create({//---> receta en BD
        name,
        summary,                 //recetaCreada={receta}
        healthScore,
        steps,
        image,
        createInDb,
        });
        let dietDb = await Diet.findAll({//dietas--> BD -->[vgan, paleo]
            where: {name : diets}
        })

      await recetaCreada.addDiet(dietDb)//-->
      const recetaUno= await Recipe.findAll({
          where: {name:name},
          include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes : [],
            }
        }
      })
      //console.log('Re:',recetaUno)
        res.send(recetaUno)

   }catch(error){
       res.status(404).send({msg:error})
   }
  
});

router.get('/recipes/:id', async (req,res)=>{
    const { id } = req.params;
    const recipesTotal = await getAllRecipes()
    if(id){
        let recipeId = await recipesTotal.filter(el => el.id==id)
        recipeId.length?
        res.status(200).json(recipeId):
        res.status(404).send('not found')
    }
});

router.delete("/recipe/delete/:id",async(req,res)=>{
    const id=req.params.id
    try{
        let rec=await Recipe.destroy({
            where:{
                id:id
            }
        })
        return res.json({delete:true})
    }catch(error){
        console.log(error)
    }
})







//BASE de datos : food--> crear con postgres
//traemos sequielize
// conectas sequelize con BS (postgre usuario / food) --> sequile
//Definis modelos : seq.define--->{prop:valor}
//receta(sequelize) ---> conectas tu modelo a la BD
//dietas(sequelize)
//sequelize.models =>{receta,dietas}
// sequielize.sync()---> MODELOS -> Tablas / entidades: (columnas y filas)
// {props : valore}
//  columnas
//  atributos
module.exports = router; 










//---------------------------


// //BACK 2
// const getApiInfo = async () => {
//     try
//     {
//         const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)
//         const apiInfo = await apiUrl.data.results.map(el => {
//                     return {
//                         id: el.id,
//                         name : el.title,
//                         summary: el.summary,
//                         image: el.image,
//                         healthScore : el.healthScore,
//                         diets : el.diets.map(dieta=>{return{name:dieta}}),
//                         steps: el.analyzedInstructions[0]?.steps.map(step => {
//                         return{
//                             number: step.number, 
//                             step: step.step,
//                         }}),
//                     }})
//                 return apiInfo
//     }catch(error){
//         console.error(error);
//         return ([])
//     }
// }


// const getDbInfo = async () =>{
//     try { 
//         return await Recipe.findAll({
//                 include:{
//                 model: Diet,
//                 attributes: ['name'],
//                 through: {
//                     attributes : [],
//                 }}
//             })       
//     } catch (error) {
//         console.log(error)
//     }
// };


// const getAllRecipes = async () =>{//getAllInfo
//     try {
//         const apiInfo = await getApiInfo();
//     const dbInfo = await getDbInfo();
//     const infoTotal = apiInfo.concat(dbInfo)
//     //console.log('esto:'+infoTotal)
//     return infoTotal
//     } catch (error) {
//         console.log(error)
//     }
    
// };


// const getApiByName = async (name) => {
           
//             try{              
//               const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${YOUR_API_KEY}`)
//               const {results} = apiUrl.data;
//               if(results.length>0){
//                   let response = results?.map(el => {
//                     return {
//                         id: el.id,
//                         name : el.title,
//                         summary: el.summary,
//                         image: el.image,
//                         healthScore : el.healthScore,
//                         diets : el.diets.map(dieta=>{return{name:dieta}}),
//                        steps: el.analyzedInstructions[0]?.steps.map(step => {
//                 return{
//                     number: step.number, 
//                     step: step.step,
//                 }})
//             }})
//                 return response  
//               }else{
//                 console.log('Recipe not Found')
//               }                    
//             }catch (error) {
//                 console.error(error);
//                 return ('error')
//             }
//         }

// const getDBByName = async(name)=>{
//     try {
//         const data=await Recipe.findAll({
//                     where: {
//                         name: {[Op.iLike]:'%' + name + '%'}}, 
//                         include:{
//                             model:Diet,
//                             attributes:['name'],
//                             through:{
//                                 attributes: []
//                             }
//                         }
//                         }                        
//                     );
//                     return data
//     } catch (error) {
//         console.log(error)
//     }

// } 
// // const getDBByName = async (name) => {
// //     try{
// //         const DBInfo = await getDbInfo();
// //         const filtByName = DBInfo.filter(recipe => recipe.name.includes(name));               
// //         return filtByName;
// //  }catch (error) {
// //     return ('error')
// //         } 
// //     }

     
// const getInfoByName = async (name) => {
//     try{
//         const apiByName = await getApiByName(name)
//         const DBByName = await getDBByName(name)
//         const infoTotal = apiByName.concat(DBByName)
//         return infoTotal
//     }catch (error) {
//         return ('error')
//     }
// };    

      

// router.get('/recipes', async (req, res) => {
    
//         const { name } = req.query
    
//         if (name) {
      
//             const infoByName = await getInfoByName(name);
//             if (infoByName !== 'error'){
//                 console.log("Recipe found")
//                 infoByName.length > 0 
//                 ? res.json(infoByName) 
//                 : res.status(400).json([{ name: 'Recipe not found'}]);
//             }else{
//                 console.log("Error")
//                 res.status(404).json([{ name: 'Error'}])
//             }
    
//         }else{
//             const allDate = await getAllRecipes() 
//             if (allDate !== 'error'){  
//                 res.json(allDate);
//             }else{
//                 res.status(404).json({message:'Error'})
//             }    
//         }
//     });




//     router.get('/recipes/:id', async (req, res) => {
//         const { id } = req.params; 
//         console.log('soy id:',id)     
//         try{
//             if (id.length > 12){
//                 const dataDB = await Recipe.findByPk(id,{
//                     include: {
//                     model: Diet,
//                     atributes: ["name"],
//                     through: {
//                         attributes: [],
//                         },
//                     },
//                 });
//                 if(dataDB){              
//                     res.send(dataDB)
//                 }else{
//                     res.status(404).json({message:'Error'})
//                 }
//             }else{
//                 const dataApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
//                 //console.log('soy dataApi:',dataApi.data)
//                 const recetaId = {
//                     id: dataApi.data.id,
//                     name: dataApi.data.title,
//                     summary:dataApi.data.summary,
//                     image: dataApi.data.image,
//                     healthScore:dataApi.data.healthScore,
//                     diets:dataApi.data.diets.map(dieta=>{return{name:dieta}}),
//                     steps:dataApi.data.analyzedInstructions[0]?.steps.map(s => {
//                         return `${s.number} : ${s.step}`})
//                 }
//                 //console.log('soy receta:',recetaId)
//                 return res.send(recetaId)
//             }
//         }catch(e){         
//         console.log('soy error:',e)
//         }
//     })

// router.get('/types', async (req,res)=>{
//     const tiposdeDieta = ['gluten free', 'ketogenic', 'dairy free', 'vegetarian', 'lacto vegetarian','ovo vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30'];
//     tiposdeDieta.forEach(dieta => {
//         Diet.findOrCreate({
//             where: { name : dieta}
//         })
//     });
//     const allDiets = await Diet.findAll();
//     res.send(allDiets);
// });

// router.post('/recipe', async (req,res)=>{
//     const { name , summary , healthScore ,  steps, image, diets, createInDb} = req.body;
//     const recetaCreada = await Recipe.create({
//         name,
//         summary,                 
//         healthScore,
//         steps,
//         image,
//         createInDb
// });
// let dietDb = await Diet.findAll({
//     where: {name : diets}
// })

// recetaCreada.addDiet(dietDb)
// res.send(recetaCreada)
// });

// // 
// module.exports = router;



