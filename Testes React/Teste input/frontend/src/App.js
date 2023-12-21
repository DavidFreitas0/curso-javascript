import './App.css';
import { useState } from 'react';


function App() {

  const [valueInput, setValueInput] = useState('');
  let [peso, setPeso] = useState('');
  const [uniMed, setUniMed] = useState('');
  const [pesoEmGrama, setPesoEmGrama] = useState('')


  const handleChangeNumber = (e) => {
    const result = e.target.value;
    setValueInput(result);
  }

  // const inserirPeso = (e) => {
  //   e.preventDefault();
  //   setPeso(valueInput);
  // }

  const unidadeMedida = (e) => {
    setUniMed(e.target.value);
  }

  const verificarUnidadeMedida = (e) => {
    e.preventDefault();
    setPeso(valueInput);
    if (uniMed === "Kg") {
      setPesoEmGrama(peso * 1000);
      console.log(pesoEmGrama);
    } else if (uniMed === "Tl") {
      setPesoEmGrama(peso * 1000000);
      console.log(pesoEmGrama);
    } else {
      setPesoEmGrama(peso);
      console.log(pesoEmGrama);
    }
  }
  return (
    <div className="App">
      <form>
        <span>Insira o peso da encomenda</span>
        <br />
        <input
          type="text"
          placeholder="Insira o peso"
          value={valueInput}
          onChange={handleChangeNumber}
        ></input>

        <select value={uniMed} onChange={unidadeMedida}>
          <option value="Gr">Grama</option>
          <option value="Kg">Kg</option>
          <option value="Tl">Tonelada</option>
        </select>

        <br />
        <button onClick={verificarUnidadeMedida}>Enviar</button>
        {peso &&
          <span> O peso é {peso} {uniMed}!</span>
        }
        {pesoEmGrama &&
        <span> O peso em gramas é {pesoEmGrama}!</span>
        }
      </form>
    </div>


  );
}

export default App;
