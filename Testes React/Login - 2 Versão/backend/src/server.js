//Express
const express = require('express');
const app = express();
app.use(express.json());
//Cors
const cors = require("cors");
app.use(cors());
// Routers
const Login = require('./routes/login');
//Mysql - Conexão com o BD
const mysql = require('mysql2');
const port = 3001;
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'vao359685',
  database: 'login'
})

app.use((req, res, next) => {
    req.connection = connection;
    next();
  });

app.use('/app', Login);

app.listen(port, () => {
    console.log("Servidor rodando!");
  });