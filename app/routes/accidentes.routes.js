// module.exports = (app) => {
//     const accidentes = require('../controllers/accidentes.controller.js');
//     // Crear un accidente
//     app.post('/accidentes', accidentes.create);
//     // Consultar todos los accidente
//     app.get('/accidentes', accidentes.findAll);
//     // Consultar un accidente
//     app.get('/accidentes/:id', accidentes.findOne);
//     // Editar un accidente
//     app.put('/accidentes/:id', accidentes.update);
// }
var router = require('express').Router();
const accidentes = require('../controllers/accidentes.controller.js');
// Crear un accidente
router.post('/accidentes', accidentes.create);
// Consultar todos los accidentes
router.get('/accidentes', accidentes.findAll);
// Consultar un accidente
router.get('/accidentes/:id', accidentes.findOne);
// Editar un accidente
//router.put('/accidentes/:id', accidentes.update);
module.exports = router;
