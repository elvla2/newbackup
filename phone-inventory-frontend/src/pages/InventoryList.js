import React, { useEffect, useState } from 'react';
import { getItems, getInventoryTotals } from '../services/api'; // ✅ Updated import
import { Link } from 'react-router-dom';
import '../styles/inventory.css';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState({ totalProducts: 0, totalStock: 0, totalValue: 0 });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const data = await getItems();
    const totalData = await getInventoryTotals();
    setItems(data);
    setTotals(totalData);
  };

  return (
    <div className="container">
      <h1>Item Inventory</h1>

      {/* Styled Add New Item Button */}
      <div className="button-container">
        <Link to="/add" className="add-item-button">➕ Add New Item</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>SKU</th> {/* Changed from Brand to Name */}
            <th>Item Name</th> {/* This was previously Name */}
            <th>memory</th>
            <th>color</th>
            <th>Stock</th>
            <th>Cost</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
  {items.map((item) => (
    <tr key={item.id}>
      <td>{item.sku}</td>
      <td>{item.name}</td>
      <td>{item.memory}</td>
      <td>{item.color}</td>
      <td>{item.stock.toLocaleString()}</td>
      <td>${item.price.toLocaleString()}</td>
      <td>${(item.stock * item.price).toLocaleString()}</td>
    </tr>
  ))}
          {/* Totals Row */}
          <tr className="totals-row">
          <td></td>
          <td></td> 
          <td></td>
          <td></td>      
          <td><strong>Total Stock:</strong> {totals.totalStock.toLocaleString()}</td>                 
          <td></td>
          <td><strong>Total Inventory Value:</strong> ${totals.totalValue.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
