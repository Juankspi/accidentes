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
        type: String
    },
    estado: {
        type: String,
        required: true
    },
    fecha: Date,
    location: {
        'type': { type: String },
        coordinates: { type: [Number], default: [0, 0] }
    }
}, {
        timestamps: true
    });

AccidentesSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Accidentes', AccidentesSchema);