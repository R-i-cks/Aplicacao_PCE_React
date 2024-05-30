const express = require('express');
const router = express.Router();
const Notificacao = require('../modelos/notificacao');

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
    const {nome, data } = req.body;

    try {
        let notificacao = new Notificacao({nome, data});
        await notificacao.save();
        res.json(notificacao);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
});

module.exports = router;
