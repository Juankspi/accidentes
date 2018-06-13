var router = require('express').Router();
const hospitales = require('../controllers/hospitales.controller.js');

router.post("/", hospitales.create)
router.get('/', hospitales.findAll);
// Obtener un hospital por id
router.get('/:id', hospitales.findOne);
// Eliminar un hospital por id
router.delete('/:id', hospitales.delete);

module.exports = router;