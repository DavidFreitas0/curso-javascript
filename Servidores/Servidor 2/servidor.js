//RUNTIME = Em tempo de execução
const http = require("http");
const url = require("url");

const listTodo = require("./todos-route").listTodo;
const addTodo = require("./todos-route").addTodo;
const deleteTodo = require("./todos-route").deleteTodo;
const updateTodo = require("./todos-route").updateTodo;

//Outro jeito de importar as funções
//const {listTodos, addTodos, deleteTodos, updateTodos} = require("./todos-route");
//request: o servidor recebe (Pergunta)
//response: O servidor responde (Resposta)

function processRequest(request, response) {
    const reqUrl = url.parse(request.url, true);

    if(reqUrl.pathname == "/todo") {
        switch(request.method) {
            case "GET":
                listTodo(request,response,reqUrl);
                break;
            case "POST":
                addTodo(request,response,reqUrl);
                break;
            case "PUT":
                updateTodo(request,response,reqUrl);
                break;
            case "DELETE":
                deleteTodo(request,response,reqUrl);
                break;            
        }
    }
}

const server = http.createServer(processRequest);
server.listen(3000);