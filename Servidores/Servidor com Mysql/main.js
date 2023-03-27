const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "servidor_curso"
});

//ADICIONANDO 10 CATEGORIAS
for(let i=0; i<10; i++){
    connection.query(`INSERT INTO category (name) VALUES ('CATEGORIA - ${i}')`);
}

//ADICIONANDO 1000 TODOS, A CADA 100 MUDANDO A CATEGORIA
for(let i=0; i<1000; i++){
    if(i<100){
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('TODO - ${i}', 'OI ${i}', 1)`);
    } 
    else if(i>99 && i<200){
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('TODO - ${i}', 'OI ${i}', 2)`);
    }
    else if(i>199 && i<300){
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('TODO - ${i}', 'OI ${i}', 3)`);
    }
    else if(i>299 && i<400){
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('TODO - ${i}', 'OI ${i}', 4)`);
    }
    else if(i>399 && i<500){
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('TODO - ${i}', 'OI ${i}', 5)`);
    }
    else if(i>499 && i<600){
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('TODO - ${i}', 'OI ${i}', 6)`);
    }
    else if(i>599 && i<700){
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('TODO - ${i}', 'OI ${i}', 7)`);
    }
    else if(i>699 && i<800){
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('TODO - ${i}', 'OI ${i}', 8)`);
    }
    else if(i>799 && i<900){
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('TODO - ${i}', 'OI ${i}', 9)`);
    }
    else if(i>899 && i<1000){
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('TODO - ${i}', 'OI ${i}', 10)`);
    }
}



connection.query('SELECT * FROM todo', (error, result, fields) => {
    console.log(result);
});

// connection.query('SELECT * FROM category', (error, result, fields) => {
//     console.log(result);
// });