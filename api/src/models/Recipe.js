const { DataTypes, asIs } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allownull:false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  
      // validate:{
      //   isAlpha: true
      // }
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT
    },
   
    healthScore:{
      type: DataTypes.INTEGER,
      validate:{
        min:0,
        max:100
      }
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    createInDb:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },

    
  },
  {timestamps :false});
};




// [ ] Receta con las siguientes propiedades:
// ID: *
// Nombre *
// Resumen del plato *
// Puntuación
// Nivel de "comida saludable"
// Paso a paso





 















// puntuacion: {
//   //       type: DataTypes.INTEGER,
//   //       set(value) { this.setDataValue('puntuacion', !value ? 0 : value)}--->OJO!!!!!
//   //     },
//   //     nivel: {
//   //       type: DataTypes.INTEGER,
//   //       set(value) { this.setDataValue('nivel', !value ? 0 : value)}
//   //     },


