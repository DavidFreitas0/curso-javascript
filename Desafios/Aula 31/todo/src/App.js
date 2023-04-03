import './App.css';
import {useEffect, useState} from 'react';

function request(url, options){
  url = 'http://localhost:3001' + url;
  return fetch(url, options);
}

function App() {

  const [todolist, setTodoList] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  const loadTodo = () => {
    request('/todo').then((response) => {
      response.json().then((todos) => {
        setTodoList(todos);
      });
    });
  };

  const deleteTodo = (id) => {
    request('/todo/' + id, {
      method: 'DELETE'
    }).then(() => {
      setTodoList(todolist.filter((todo) =>{
        return todo.id != id;
      }));
      console.log("Todo foi deletado");
    });
  };

  const createTodo = () => {
    if(title == "" || description == ""){
      return;
    }
    request('/todo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        categoryId: 1
      })
    }).then(() => {
      loadTodo();
      console.log("Todo foi Criado");
    });
    setTitle('');
    setDescription('');
  };

  useEffect(() => {
    loadTodo();
  }, []);
  return (
    <div className="App">
      <ul className="todo-list">
        {todolist.map((todo) => {
          return <li key={todo.id}>
            <button onClick={() => deleteTodo(todo.id)}>X</button>
            <strong>{todo.title}</strong>
            <br/>
            <span>{todo.description}</span>
            </li>
        })}
      </ul>
      <div>
        <label>
          Título
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
          <br/>
          Descrição
          <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}></input>
        </label>
      </div>
      <button onClick={createTodo}>Criar Novo Todo</button>
    </div>
  );
}

export default App;
