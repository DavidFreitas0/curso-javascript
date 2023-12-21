import { useState } from 'react';
import './drop.css';

function DropdownOrder(props) {

  const [order, setOrder] = useState('Filtro');

  const selectChange = (e) => {
    setOrder(e.target.value);
    props.onClick(e.target.value);
  };

  return (
    <div className="dropdown">
        <br />
        <select className="select" value={order} onChange={selectChange}>
          <option>Filtro</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
    </div>
  );
}

export default DropdownOrder;
