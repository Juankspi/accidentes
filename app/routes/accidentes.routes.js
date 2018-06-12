module.exports = (app) => {
    const accidentes = require('../controllers/accidentes.controller.js');
    const hospitales = require('../controllers/hospitales.controller.js');
    // Crear un accidente
    app.post('/accidentes', accidentes.create);
    // Consultar los ultimos 10 accidentes activos reportados del mas reciente al mas antiguo
    app.get('/accidentes', accidentes.findAll);
    // Consultar un accidente
    app.get('/accidentes/:id', accidentes.findOne);
    //Listar los 3 hospitales mas cercanos a un accidente
    app.get('/accidentelocation/:id/hospitales', accidentes.findLocation)
    // Editar un accidente
    app.put('/accidentes/:id', accidentes.update);

    //HOSPITALES

     // Create a new Product
     app.post('/hospitales', hospitales.create);
     // List all Products
     app.get('/hospitales', hospitales.findAll);
     // Get a single Product by id
     app.get('/hospitales/:id', hospitales.findOne);
     // Update a Product by id
     app.put('/hospitales/:id', hospitales.update);
     // Delete a Product by id
     app.delete('/hospitales/:id', hospitales.delete);

}