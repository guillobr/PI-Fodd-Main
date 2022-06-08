const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');  // trae el index de la carpta routes
//APUNTE cualquier ruta la escribo dentro del index de routes

require('./db.js');

const server = express();

server.name = 'API';
//APUNTE reempalzar por express??
//
// server.use(express.urlencoded({ extended: true, limit: '50mb' }));
// server.use(express.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => { //estas son configuraciones de CORS
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes); //a cualqeuir ruta que le pegue va a utilizar routes--> routes es el index de la carpeta routes

//Aqui abajo configura los middleware
// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;  // exporta el servidor---> lo levanta en index general


