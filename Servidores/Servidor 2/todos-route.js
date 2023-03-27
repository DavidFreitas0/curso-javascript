let todos = [
    {id:1, title: "Fazer a Feira", description: "Laranjas, Arroz, Carne"},
    {id:48, title: "Fazer a Feira", description: "Laranjas, Arroz, Carne"},
    {id:22, title: "Fazer a Feira", description: "Laranjas, Arroz, Carne"},
    {id:31, title: "Fazer a Feira", description: "Laranjas, Arroz, Carne"},
];

let currentID = 1;
if(todos.length > 0) {
    let maiorID = 0;
    for(let i = 0; i<todos.length; i++){
        if(maiorID < todos[i].id){
            maiorID = todos[i].id;
        }
    }
    currentID = maiorID;
}

function addID(task){
    currentID++;
    task.id = currentID;
}

function addTimesTamp(task){
    task.createdAt = +new Date();
}

//CRUD C=Create, R=Read, U=Update, D=Delete
function addTodo(request, response, task){
        response.statusCode = 201;
        let data = "";
        request.on('data', (chunk) => {
            data += chunk;
        });
        request.on("end", () => {
            let task = JSON.parse(data);
            if(task.title && task.description){
                addID(task);
                addTimesTamp(task);
                todos.push(task);
                response.end();
            } else {
                response.statusCode = 400;
                response.end("BAD REQUEST");
            }
        });
    } 


function listTodo(request, response){
    response.setHeader('Content-type', 'application/json');
    response.end(JSON.stringify(todos));
}

function deleteTodo(request, response, url){
    if(url.query.id){
        let newTodos = [];
        for(let i = 0; i<todos.length; i++){
            if(todos[i].id != url.query.id) {
                newTodos.push(todos[i]);
            }
        }
        todos = newTodos;
        response.end();
    } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
    }   
}

function updateTodo(request, response, url){
    if(url.query.id){
        for(let i = 0; i<todos.length; i++){
            if(todos[i].id == url.query.id) {
                let data = "";
                request.on('data', (chunk) => {
                    data += chunk;
                });
                request.on("end", () => {
                    let task = JSON.parse(data);
                    if(task.title && task.description){
                        task.id = todos[i].id;
                        task.createdAt = todos[i].createdAt;
                        todos[i] = task;
                        response.end();
                    }  else {
                        response.statusCode = 400;
                        response.end("BAD REQUEST");
                    }   
                });
            }
        }
    } else {
        response.statusCode = 400;
        response.end("BAD REQUEST");
    }
}

module.exports = {
    addTodo, listTodo, deleteTodo, updateTodo
}