const mongoose = require('mongoose');
const AccidentesSchema = mongoose.Schema({
    tipo: {
        type: String,
        index: true,
        unique: true,
        required: true,
        trim: true,
        minlength: 4
    },
    foto: {
        type: String
    },
    prioridad: {
        type: String,
        minlength: 2
    },
    fecha: Date,
    location: {
        type: [Number], 
        index: '2dsphere'
    }
}, {
        timestamps: true
    });
module.exports = mongoose.model('Accidentes', AccidentesSchema);