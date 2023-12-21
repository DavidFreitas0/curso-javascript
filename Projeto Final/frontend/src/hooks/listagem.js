// import './App.css';
import { useEffect, useState } from 'react';
import DropDownOrder from './dropdown.js';

function request(url, options) {
  url = 'http://localhost:3001' + url;
  return fetch(url, options);
}

function ListOrders() {

  const [ordersList, setOrdersList] = useState([]);

  const orderList = (order) => {
    request('/orders?order=' + order).then((response) => {
      response.json().then((orders) => {
        setOrdersList(orders);
      });
    });
  };

  const listOrders = () => {
    request('/orders/list').then((response) => {
      response.json().then((orders) => {
        setOrdersList(orders);
      });
    });
  };

  useEffect(() => {
    listOrders();
  }, []);

  return (
    <div className="App">
    <DropDownOrder onClick={orderList}></DropDownOrder>
      <ul className="todo-list">
        {ordersList.map((orders) => {
          return <li key={orders.id}>
            Nome:
            <strong>{orders.name}</strong>
            <br/>
            Peso:
            <strong>{orders.weight}</strong>
            <br/>
          </li>
        })}
      </ul>
    </div>
  );
}

export default ListOrders;
