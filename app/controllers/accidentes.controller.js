const Accidentes = require('../models/accidentes.model.js');
const Hospitales = require('../models/hospitales.model.js');
// Crear un accidente
exports.create = (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Los datos de accidente no pueden ser vacios"
        });
    }
    // Crear un nuevo accidente con los datos de entrada
    const accidentes = new Accidentes({
        tipo: req.body.tipo,
        foto: req.body.foto || "Sin foto",
        prioridad: req.body.prioridad,
        estado: req.body.estado,
        fecha: req.body.fecha || null,
        location: req.body.location
    });
    // Guardar el accidente en la base de datos
    accidentes.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while creating the record."
            });
        });
};

// Consultar los ultimos 10 accidentes activos reportados del mas reciente al mas antiguo
exports.findAll = (req, res) => {
    Accidentes.find({estado:"Activo"}).limit(10).sort( { fecha: -1 } )
        .then(accidentes => {
            res.status(200).send(accidentes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while retrieving the records."
            });
        });
};

// Consultar un accidente por ID
exports.findOne = (req, res) => {
    Accidentes.findById(req.params.id)
        .then(accidentes => {
            if (!accidentes) {
                return res.status(404).send({
                    message: "Accidente not found with id:" + req.params.id
                });
            }
            res.status(200).send(accidentes);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Accidente not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while retrieving the record with id:"
                    + req.params.id
            });
        });
};

//encontrar la ubicacion de un accidente
exports.findLocation = (req, res) => {
    Accidentes.find({_id: req.params.id},{location:1,_id:0})
        .then(accidentes => {
            res.status(200).send(accidentes[0]["location"]);
            console.log(res);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while retrieving the records."
            });
        });
};



// Editar un accidente
exports.update = (req, res) => {
    console.log("Updating a particular accidente ... soon!");
};
