var express = require("express");
const connectDB = require('./db');
var router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express()

const corsOptions = {
    origin: 'http://localhost:8081',   
  };



app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
app.use(bodyParser.json());

connectDB()


app.options('*', cors());

// Definir Rotas
app.use('/api/registos', require('./rotas/registos'));
app.use('/api/notificacoes', require('./rotas/notificacoes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));

