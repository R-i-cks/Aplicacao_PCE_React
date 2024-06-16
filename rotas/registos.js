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
    const { at0004, at0005, bpm, at1007, date_t, at0014 } = req.body;

    try {
        let registo = new Registo({ data: {at0004, at0005, bpm, at1007}, date_t, protocol:{at0014} });
        await registo.save();
        res.status(201).send(registo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
});

router.get('/:id', async(req, res)=> {
    try{
        const {id} = req.params;
        const registo = await Registo.findById(id);
        if (!registo){
            return res.status(404).send('Registo não encontrado')
        }
        res.status(200).send(registo);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
});

router.put('/:id', async(req, res)=>{
    console.log(req.params)
    try {
        const{id} = req.params;
        
        const registo = await Registo.findByIdAndUpdate(id, req.body);
        if (!registo){
            return res.status(404).send('Registo não encontrado');
        }
        const updatedRegisto = await Registo.findById(id);
        res.status(200).send(updatedRegisto)
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const registo = await Registo.findByIdAndDelete(id);
        if (!registo) {
            return res.status(404).send('Registo não encontrado');
        }
        res.status(200).send(registo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no Servidor');
    }
});


module.exports = router;
