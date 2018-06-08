// Se importan los modulos
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Creacion de la aplicacion
const app = express();
// Configuracio del servidor
// Parse requests of content-type - "application/x-www-form-urlencoded"
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - "application/json"
app.use(bodyParser.json())

// Listening server port
var port = process.env.PORT || 3000;
// Definicion de las rutas
app.get('/', (req, res) => {
    res.json({
        "message": "This is a JSON response to a HTTP GET request."
    });
});

// Iniciar el servidor
// Connect to the database
mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Connect to database: success!");
    }).catch(err => {
        console.log('Connect to database: failure!');
        process.exit();
    });

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});