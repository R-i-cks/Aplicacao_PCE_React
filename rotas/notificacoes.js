const express = require('express');
const router = express.Router();
const Notificacao = require('../modelos/notificacao');
const { EventToCalendar, auth_and_send_notif } = require('/home/utilizador/Uni/4_Ano/2_Semestre/PCE/TP/heart-app/scripts/not_to_calendar.js');





// Rota para obter todas as notificacoes
router.get('/', async (req, res) => {
    try {
        const notificacoes = await Notificacao.find();
        res.json(notificacoes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
});

// Rota para criar uma nova
router.post('/', async (req, res) => {
    const {texto, data } = req.body;
    try {
        let notificacao = new Notificacao({texto, data});
        await notificacao.save();
        res.json(notificacao);
        auth_and_send_notif(data, texto)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
});

module.exports = router;
