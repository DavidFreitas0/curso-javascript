
let currentId = 0;

function setupCurrentIdUsers(users) {
  for (let i=0; i<users.length; i++){
      if (users[i].id > currentId)
        currentId = users[i].id;
  }
}

function addID(users) {
  currentId = currentId + 1;
  users.id = currentId;
}

function addTimestemp(users) {
    users.createdAt = +new Date();
    users.updatedAt = +new Date();
}

function addUsers(request, response, url, todos, categories, users, writeUSERStoFile) {
    response.statusCode = 201;
    let data = "";
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on("end", () => {
      let task = JSON.parse(data);
      if (task.name && task.username && task.password && task.isActive) {
        addID(task);
        addTimestemp(task);
        users.push(task);
        writeUSERStoFile();
        response.end();
      } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
      }
    }); 
} 

function listUsers(request, response, url, todos, categories, users) {
    response.setHeader ('Content-type', 'application/json')
    if (url.query.id) {
        let task = findById(url.query.id);
        if (task && (!task.deletedAt || url.query.showDeleted == "true")){
            response.end(JSON.stringify(task));
        }else {
            response.statusCode = 404;
            response.end("NOT FOUND");
        }
    } else {
        let newUser = [];
        for (let i = 0; i <users.length; i++){
            if(!users[i].deletedAt || url.query.showDeleted == "true"){
                newUser.push(users[i]);
            }
        }
        response.end(JSON.stringify(newUser));
    }
}

function deleteUser(request, response, url, todos, categories, users,  writeUSERStoFile) {
  if(url.query.id){
      for(let i=0; i<users.length; i++){
          if(users[i].id == url.query.id){
            users[i].deletedAt = +new Date();
            writeUSERStoFile();
          }
      } 
      response.end();
  } else {
    response.statusCode = 400;
    response.end("BAD REQUEST");
  }
}

function updateUsers(request, response, url, todos, categories, users, writeUSERStoFile) {
  if(url.query.id){
    for(let i=0; i<users.length; i++) {
      if(users[i].id == url.query.id && !users[i].deletedAt) {
        let data = "";
        request.on('data', (chunk) => {
            data += chunk;
        });
        request.on("end", () => {
            let task = JSON.parse(data);
            if (task.name && task.password) {
              task.id = users[i].id;
              task.createdAt = users[i].createdAt;
              task.updatedAt = +new Date();
              users[i] = task;
              writeUSERStoFile();
              response.end();
            } else {
              response.statusCode = 400;
              response.end("BAD REQUEST");
            }
        });
        return;
      }
    }
    response.statusCode = 404;
    response.end("NOT FOUND");
  } else {
    response.statusCode = 400;
    response.end("BAD REQUEST");
  }
}

module.exports = {
  listUsers, addUsers, updateUsers, deleteUser,setupCurrentIdUsers
}