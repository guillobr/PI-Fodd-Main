require('dotenv').config();   //para variables de entorno, que solo el servidor conoce
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;  //sacadas de un archivo .env

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models')) //le la carpeta models//lee todos los archivos de una
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')) // trae todos los archivos que terminan en .js que van a ser las funciones que van/va a crear nuestros modelos
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file))); //define nuestros modelos
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize)); //los conecta con sequelize// trae las funciones de los modelos y las conecta directamente con sequelize
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipe , Diet } = sequelize.models;  //aqui me paro en sequeliza y saco los modelos

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Recipe.belongsToMany(Diet, {through: 'Recipe_Diet'});
Diet.belongsToMany(Recipe, {through: 'Recipe_Diet'});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};


//---APUNTES

// module.exports = {
//   ...sequelize.models, ---->aqui exporta todos los modelos ya conectados a sequelize
//   conn: sequelize,     ---> aqui exporta la instacia de sequelize con este nombre
// };


