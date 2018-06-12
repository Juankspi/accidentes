const Hospitales = require('../models/hospitales.model.js');
const Accidentes = require('../models/accidentes.model.js');
// Create and save a new Product
exports.create = (req, res) => {
    console.log("Creating a product ... soon!");
};
// Consultar hospitales
exports.findAll = (req, res) => {
    Hospitales.find()
        .then(hospitales => {
            res.status(200).send(hospitales);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while retrieving the records."
            });
        });
};
// Get a single Product by its id
exports.findOne = (req, res) => {
    Hospitales.findById(req.params.id)
        .then(hospitales => {
            if (!hospitales) {
                return res.status(404).send({
                    message: "Accidente not found with id:" + req.params.id
                });
            }
            res.status(200).send(hospitales);
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
// Update a Product by its id
exports.update = (req, res) => {
    console.log("Updating a particular product ... soon!");
};

// Delete a Product by its id
exports.delete = (req, res) => {
    console.log("Deleting a particular product ... soon!");
};