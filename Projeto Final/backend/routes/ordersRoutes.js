const express = require('express');
const router = express.Router();

//ROUTER PARA LISTAR ENCOMENDAS  (listOrders) 
router.get('/list', (req, res) => {
    let query = `SELECT * FROM orders`
    if (req.query.showDeleted != "1") {
        query += ` WHERE deleted_at IS NULL`
    }
    req.connection.query(query, (error, result) => {
        if (error) {
            res.status(404).send();
            console.log(error);
        } else {
            res.send(result);
        }
    })
})

router.get('/list/:id', (req, res) => {
    let query = `SELECT * FROM orders WHERE id=${req.params.id}`;
    if (req.query.showDeleted != "1") {
        query += ` AND deleted_at IS NULL`
    }
    req.connection.query(query, (error, result) => {
        if (error) {
            res.status(404).send();
            console.log(error);
        } else {
            res.send(result);
            console.log(query);
        }
    })
})

/*ROUTER PARA ORDENAR ENCOMENDAS (orderOrders)*/

router.get('/', (req, res) => {
    let query = `SELECT * FROM orders`;
    if (req.query.showDeleted != "1") {
        query += ` WHERE deleted_at IS NULL`; 
    }
    if(req.query.order == 'asc'){
        query += ` ORDER BY name ASC`
    }else if(req.query.order == 'desc'){
        query += ` ORDER BY name DESC`
    }
    req.connection.query(query, (error, result) => {
        if (error) {
            res.status(404).send();
            console.log(query);
        } else {
            res.send(result);
        }
    })
})

module.exports = router;