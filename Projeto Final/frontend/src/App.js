import './App.css';
import ListOrders from './hooks/listagem';
import { useEffect, useState } from 'react';

function App() {

  return (
    <div className="App">
      <ListOrders/>
    </div>
  );
}

export default App;
