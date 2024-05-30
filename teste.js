const axios = require('axios');

// Dados a serem enviados no corpo da solicitação
const dados = {
  nome: 'Ricardo',
  data: '2023-05-31',
  pressao_sist: 120,
  pressao_diast: 80,
  bpm: 70
};

// Fazendo a solicitação POST
axios.post('http://localhost:5000/api/registos', dados)
  .then(response => {
    console.log('Resposta:', response.data);
  })
  .catch(error => {
    console.error('Erro:', error.response.data);
  });
