function addTodo(request, response, url, connection) {
 let query = `INSERT INTO todo (title, description, category_id)`;
 let data = "";
  request.on('data', (chunk) => {
      data += chunk;
  });
  request.on("end", () => {
    let task = JSON.parse(data);
    if (task.title && task.description && task.categoryId) {
      query += ` VALUES ('${task.title}', '${task.description}', '${task.categoryId}')`;
    } else {
          response.statusCode = 400;
          response.end("BAD REQUEST");
        }

  console.log(query);
  connection.query(query, (error, result) => {
    if (error) {
      response.statusCode = 404;
      response.end("NOT FOUND");
    } else {
      response.end(JSON.stringify(result));
    }
  });
  });
} 

function listTodos(request, response, url, connection) {
  response.setHeader('Content-type','application/json');
  let query = `SELECT * FROM todo`;
  if (url.query.id) {
    //SQLi = SQL INJECTION
    query += ` WHERE id=${url.query.id}`;
    if (url.query.showDeleted != "1") {
      query += ` AND deleted_at IS NULL`;
    }
  } else if (url.query.categoryId) {
    //SQLi = SQL INJECTION
    query += ` WHERE category_id=${url.query.categoryId}`;
    if (url.query.showDeleted != "1") {
      query += ` AND deleted_at IS NULL`;
    }
  } else {
    if (url.query.showDeleted != "1") {
      query += ` WHERE deleted_at IS NULL`;
    }
  }
  console.log(query);
  connection.query(query, (error, result) => {
    if (error) {
      response.statusCode = 404;
      response.end("NOT FOUND");
    } else {
      response.end(JSON.stringify(result));
    }
  });
}

function deleteTodo(request, response, url, connection) {
  if(url.query.id){
    let deletedAt = (new Date()).toISOString().slice(0,19).replace('T', ' ');
    connection.query(`UPDATE todo SET deleted_at='${deletedAt}' WHERE id=${url.query.id}`
    , (error, result) => {
      if(error){
        response.statusCode = 500;
        response.end("SERVER ERROR");      
      } else {
        response.statusCode = 200;
        response.end();
      }
    });
  } else {
    response.statusCode = 400;
    response.end("BAD REQUEST");
  }
}

function updateTodo(request, response, url, connection) {
  if(url.query.id){
    let data = "";
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on("end", () => {
        let task = JSON.parse(data);
        if (task.title && task.description && task.categoryId) {
          task.updatedAt = (new Date()).toISOString().slice(0,19).replace('T', ' ');
          connection.query(`UPDATE todo SET title='${task.title}', description='${task.description}', category_id=${task.categoryId}, update_at='${task.updatedAt}' WHERE id=${url.query.id}`
          , (error, result) => {
              if(error){
                response.statusCode = 500;
                response.end("SERVER");      
              } else {
                response.statusCode = 200;
                response.end();
              }
          });
          response.end();
        } else {
          response.statusCode = 400;
          response.end("BAD REQUEST");
        }
    });
  } else {
    response.statusCode = 400;
    response.end("BAD REQUEST");
  }
}

module.exports = {
  addTodo, listTodos, deleteTodo, updateTodo
}