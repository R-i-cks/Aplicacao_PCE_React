const mongoose = require('mongoose');

const RegistoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    },
    pressao_sist: {
        type: Number,
        required: true
    },
    pressao_diast: {
        type: Number,
        required: true
    },
    bpm: {
        type: Number,
        required: true
    },

});

module.exports = mongoose.model('Registo', RegistoSchema);