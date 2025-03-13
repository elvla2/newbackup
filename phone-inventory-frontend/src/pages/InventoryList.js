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
            <th>Stock</th>
            <th>Cost</th>
            <th>Total Value (Stock × Price)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.brand}</td>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>${item.price}</td>
              <td>${(item.stock * item.price).toFixed(2)}</td>
            </tr>
          ))}
          {/* Totals Row */}
          <tr className="totals-row">
            <td><strong>Total Items:</strong> {totals.totalProducts}</td>
            <td></td>
            <td><strong>Total Stock:</strong> {totals.totalStock}</td>
            <td></td>
            <td><strong>Total Inventory Value:</strong> ${totals.totalValue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
