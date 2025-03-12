import React, { useEffect, useState } from 'react';
import { getPhones } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/inventory.css';

const InventoryList = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    const data = await getPhones();
    setPhones(data);
  };

  return (
    <div className="container">
      <h1>Phone Inventory</h1>
      <Link to="/add">Add New Phone</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((phone) => (
            <tr key={phone.id}>
              <td>{phone.name}</td>
              <td>{phone.brand}</td>
              <td>${phone.price}</td>
              <td>{phone.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
