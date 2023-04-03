const express = require('express');
const app = express();

app.get('/names', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(['David', 'Vanessa', 'Junior', 'Ívina', 'Augusto', 'Beto']);
});

app.listen(3001, () => {
  console.log("Servidor Rodando");
});