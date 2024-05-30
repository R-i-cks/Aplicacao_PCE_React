const mongoose = require('mongoose');

const NotificacaoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Notificacao', NotificacaoSchema);