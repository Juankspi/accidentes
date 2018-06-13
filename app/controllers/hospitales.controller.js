const Hospital = require('../models/hospitales.model.js');

exports.create = (req, res) => {
    //Validar si en el cuerpo del request no hay información del hospital
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Debe enviar información del hospital"
        });
    }
    
    //Crea un nuevo hospital
    const hospital = new Hospital({
        nombre: req.body.nombre || "sin dato",
        direccion: req.body.direccion || null,
        webpage: req.body.webpage || null,
        telefono: req.body.telefono, 
        location: req.body.location
    });
    console.log(req.body.location);
    //Almacena el hospital en la base de datos
    hospital.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Se presentó un error mientras se estaba almacenando el registro."
            });
        });
};
//Obtener el listado de hospitales
exports.findAll = (req, res) => {
    Hospital.find()
        .then(hospitales => {
            res.status(200).send(hospitales);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Se presentó un error cuando se consultaron todos los hospitales."
            });
        });
};
//Obtener un hospital por su id
exports.findOne = (req, res) => {
    Hospital.findById(req.params.id)
        .then(hospital => {
            if (!hospital) {
                return res.status(404).send({
                    message: "El hospital con el id: " + req.params.id + "no fue encontrado."
                });
            }
            res.status(200).send(hospital);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "El hospital con el id: " + req.params.id + "no fue encontrado."
                });
            }
            return res.status(500).send({
                message: "Se presentó un error cuando se buscó el hospital con id:" + req.params.id
            });
        });
};
// Elimina un hospital por su id
exports.delete = (req, res) => {
    Hospital.findByIdAndRemove(req.params.id)
        .then(hospital => {
            if (!hospital) {
                return res.status(404).send({
                    message: "El hospital con id: " + req.params.id + "no fue encontrado"
                });
            }
            res.status(200).send({ message: "Hospital eliminado correctamente!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "El hospital con id:" + req.params.id + "no fue encontrado."
                });
            }
            return res.status(500).send({
                message: "Se presentó un error cuando se intentó eliminar el hospital con id: " +
                    req.params.id
            });
        });
};