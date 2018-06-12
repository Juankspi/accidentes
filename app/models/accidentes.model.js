const mongoose = require('mongoose');
const AccidentesSchema = mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    foto: {
        data: Buffer,
        contentType: String
    },
    prioridad: {
        type: String,
        minlength: 20
    },
    estado: {
        type: String,
        minlength: 20
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