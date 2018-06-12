const Accidentes = require('../models/accidentes.model.js');
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
    // Save the Product in the database
    accidentes.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while creating the record."
            });
        });
};
// Consultar todos los accidente
exports.findAll = (req, res) => {
    console.log("Listing all products ... soon!");
};
// Consultar un accidente
exports.findOne = (req, res) => {
    console.log("Getting a particular product ... soon!")
};
// Editar un accidente
exports.update = (req, res) => {
    console.log("Updating a particular product ... soon!");
};
