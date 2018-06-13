const Accidentes = require('../models/accidentes.model.js');
const Hospitales = require('../models/hospitales.model.js');
const fs = require('fs');
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
    accidentes.foto.data = fs.readFileSync(req.body.foto);
    accidentes.foto.contentType = 'image/png';
    accidentes.foto.contentType = 'image/jpg';
    // Guardar el accidente en la base de datos
    accidentes.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error al crear accidente."
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
                message: err.message || "Hubo un error retornando los datos."
            });
        });
};

// Consultar un accidente por ID
exports.findOne = (req, res) => {
    Accidentes.findById(req.params.id)
        .then(accidentes => {
            if (!accidentes) {
                return res.status(404).send({
                    message: "No se encuentra accidente con ese id:" + req.params.id
                });
            }
            res.status(200).send(accidentes);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se encuentra accidente con ese id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error al retornar accidentes con ese id:"
                    + req.params.id
            });
        });
};

//Listar los 3 hospitales mas cercanos a un accidente

exports.findLocation = (req, res) => {
    Accidentes.find({_id: req.params.id},{location:1,_id:0})
        .then(accidentes => {
            Hospitales.find({
                location: { $near: {
                        $geometry : accidentes[0]["location"]
                        }
                    }
                }
             ).limit(3)
                .then(hospitales => {
                    res.status(200).send(hospitales);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Error al retornar valores."
                    });
                })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Hubo un error retornando los datos."
            });
        });
};


// Editar un accidente
exports.update = (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "El accidente no puede ser vacio"
        });
    }
    // Find the Product and update it with the request body data
    Accidentes.findByIdAndUpdate(req.params.id, {
        tipo: req.body.tipo,
        foto: req.body.foto || "Sin foto",
        prioridad: req.body.prioridad,
        estado: req.body.estado,
        fecha: req.body.fecha || null,
        location: req.body.location
    }, { new: true })
        .then(accidentes => {
            if (!accidentes) {
                return res.status(404).send({
                    message: "No se encuentra accidente con el id:" + req.params.id
                });
            }
            res.status(200).send(accidentes);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se encuentra accidente con el id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error al actualizar accidente con id:" +
                    req.params.id
            });
        });
};
