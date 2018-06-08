module.exports = (app) => {
    const accidentes = require('../controllers/accidentes.controller.js');
    // Create a new Product
    app.post('/accidentes', accidentes.create);
    // List all accidentes
    app.get('/accidentes', accidentes.findAll);
    // Get a single Product by id
    app.get('/accidentes/:id', accidentes.findOne);
    // Update a Product by id
    app.put('/accidentes/:id', accidentes.update);
    // Delete a Product by id
    app.delete('/accidentes/:id', accidentes.delete);
}