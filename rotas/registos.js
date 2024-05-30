const express = require('express');
const router = express.Router();
const Registo = require('../modelos/registo');

// Rota para obter todos os registos
router.get('/', async (req, res) => {
    try {
        const registos = await Registo.find();
        res.json(registos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
});

// Rota para criar um novo registo
router.post('/', async (req, res) => {
    const { nome, data, pressao_sist, pressao_diast, bpm } = req.body;

    try {
        let registo = new Registo({nome, data, pressao_sist, pressao_diast, bpm });
        await registo.save();
        res.json(registo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
});

module.exports = router;
