// module.exports = (app) => {
//     const hospitales = require('../controllers/hospitales.controller.js');
//     // Crea un nuevo hospital
//     app.post('/', hospitales.create);
//     // Lista todos los hospitales
//     app.get('/', hospitales.findAll);
//     // Obtener un hospital por id
//     app.get('/:id', hospitales.findOne);
//     // Eliminar un hospital por id
//     app.delete('/:id', hospitales.delete);
// }
var router = require('express').Router();
const hospitales = require('../controllers/hospitales.controller.js');

router.post("/", hospitales.create)
router.get('/', hospitales.findAll);
// Obtener un hospital por id
router.get('/:id', hospitales.findOne);
// Eliminar un hospital por id
router.delete('/:id', hospitales.delete);

module.exports = router;