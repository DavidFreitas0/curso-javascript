import './App.css';
import { useState } from "react";

function App() {
  const [valor, setValor] = useState(0);

  function bloquearNumerosNegativos(novoValor){
    if(novoValor >= 0){
      setValor(novoValor);
    }
  }

  return (
    <div className="Appcounter"> 
      <span className='header'>Valor: {valor}</span>
      <br/>
      <button className='buttonP' onClick={() => bloquearNumerosNegativos(valor + 1)}>+1</button>
      <button className='buttonN' onClick={() => bloquearNumerosNegativos(valor - 1)}>-1</button>
      <button className='buttonP' onClick={() => bloquearNumerosNegativos(valor + 10)}>+10</button>
      <button className='buttonN' onClick={() => bloquearNumerosNegativos(valor - 10)}>-10</button>
      <button className='buttonP' onClick={() => bloquearNumerosNegativos(valor + 100)}>+100</button>
      <button className='buttonN' onClick={() => bloquearNumerosNegativos(valor - 100)}>-100</button>
    </div>
  );
}

export default App;
