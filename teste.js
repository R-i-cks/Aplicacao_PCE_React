const axios = require('axios');

// Dados a serem enviados no corpo da solicitação
const dados = {
  texto: 'Ricardo',
  data: '2023-07-31',

};

// Fazendo a solicitação POST
axios.post('http://localhost:5001/api/notificacoes', dados)
  .then(response => {
    console.log('Resposta:', response.data);
  })
  .catch(error => {
    console.error('Erro:', error.response.data);
  });
