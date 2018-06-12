const mongoose = require('mongoose');
const HospitalesSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true,
        unique: true,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    },
    webpage: {
        type: String,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    location: {
        type: [Number], 
        index: '2dsphere'
    }
}, {
        timestamps: true
    });
module.exports = mongoose.model('Hospitales', HospitalesSchema);