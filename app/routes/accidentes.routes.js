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
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, "UploadedOn" + Date.now() + "fileOrigName" + file.originalname)
    }
  })
var upload = multer({ storage: storage});

const accidentes = require('../controllers/accidentes.controller.js');
// Crear un accidente
router.post('/', upload.single('file'), accidentes.create);
// Consultar todos los accidentes
router.get('/', accidentes.findAll);
// Consultar un accidente
router.get('/:id', accidentes.findOne);
// Editar un accidente
router.put('/:id', accidentes.update);
// Consultar los 3 hospitales mas cercanos
router.get("/:id/hospitales",accidentes.findLocation);

module.exports = router;
