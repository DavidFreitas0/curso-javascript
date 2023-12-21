const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Cadastro de Usuário
router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  req.connection.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        req.connection.query(
          "INSERT INTO user (name, email, password) VALUE (?,?,?)",
          [name, email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

//Requisição para Login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  req.connection.query("SELECT * FROM user WHERE email = ? AND deleted_at IS NULL", [email], (err, result) => {
    if (err) {
      res.status(401).send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({ msg: "Login Efetuado com Sucesso!" });
        } else {
          res.send({ msg: "Dados Inválidos, Insira Novamente" });
        }
      });
    }
    else {
      res.send({ msg: "Falha no Login. Tente novamente!" });
    }
  });
});

//METHOD DELETE
router.delete('/delete/:id', (req, res) => {
  let query = `UPDATE user SET deleted_at=NOW() WHERE id=${req.params.id}`;
  console.log(query);
  req.connection.query(query, (error, result) => {
    if (error) {
      res.status(404).send();
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

//Alterar Usuário (Nome e Email)
router.put('/userEdit/:id', (req, res) => {
  const name = req.body.name
  const email = req.body.email

  if (name || email) {
    let query = `UPDATE user SET name='${name}', email='${email}', updated_at=NOW() WHERE id=${req.params.id}`;
    req.connection.query(query, (error, result) => {
      if (error) {
        res.status(404).send();
        console.log(error);
      } else {
        res.send(result);
        console.log(query);
      }
    });
  } else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
      }
});

module.exports = router;