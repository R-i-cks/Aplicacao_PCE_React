var express = require("express");
const connectDB = require('./db');
var router = express.Router();




const app = express()

connectDB()

// Middleware para analisar o corpo da requisição
app.use(express.json({ extended: false }));

// Definir Rotas
app.use('/api/registos', require('./rotas/registos'));
app.use('/api/notificacoes', require('./rotas/notificacoes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));

