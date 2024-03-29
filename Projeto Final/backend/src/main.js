//Express
const express = require('express');
const app = express();
app.use(express.json())
//Routers
// const indicatorsRouter = require('../routes/indicatorsRoutes');
const ordersRouter = require('../routes/ordersRoutes');
//Server
const mysql = require('mysql2');
const port = 3001;
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'vao359685',
  database: 'gestao_de_encomendas'
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  req.connection = connection;
  next();
});

app.use('/orders', ordersRouter);
// app.use('/indicators', indicatorsRouter);

app.listen(port, () => {
    console.log("Servidor rodando!");
  });