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
    //Verificar campo location
    // Se debe corregir el campo type.
    location: {
        "type": {type: String}, 
        coordinates : { type: [Number], default: [0, 0] }
    }
}, {
        timestamps: true
    });
HospitalesSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Hospitales', HospitalesSchema);