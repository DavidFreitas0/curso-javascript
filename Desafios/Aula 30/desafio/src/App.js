import './App.css';
import {useState} from 'react';

function App() {

  const [nome, setNome] = useState("");
  const [listNames, setListNames] = useState([]);



  const gerarNome = () => {
    console.log("Request");
    const index = Math.floor(Math.random() * listNames.length);
    setNome(listNames[index]);
  }

  const carregarNomes = () => {
    fetch('http://localhost:3001/names')
    .then((response) => {
      console.log("Request com Sucesso");
      response.json().then((data) => {
        setListNames(data);
        console.log("Dados do servidor :", data);
      });
    }, (error) => {
      console.error(error);
    });
  }

  return (
    <div className="App">
      <span>{nome}</span>
      <br/>
      <button onClick={gerarNome}>Mostrar Nomes</button>
      <br/>
      <button onClick={carregarNomes}>Carregar Nomes</button>
    </div>
  );
  }

export default App;
