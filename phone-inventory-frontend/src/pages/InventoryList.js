import React, { useEffect, useState } from 'react';
import { getPhones, getInventoryTotals } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/inventory.css';

const InventoryList = () => {
  const [phones, setPhones] = useState([]);
  const [totals, setTotals] = useState({ totalProducts: 0, totalStock: 0, totalValue: 0 });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const data = await getPhones();
    const totalData = await getInventoryTotals();
    setPhones(data);
    setTotals(totalData);
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
          {/* Totals Row */}
          <tr className="totals-row">
            <td><strong>Total Products:</strong> {totals.totalProducts}</td>
            <td></td>
            <td><strong>Total Inventory Value:</strong> ${totals.totalValue}</td>
            <td><strong>Total Stock:</strong> {totals.totalStock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
