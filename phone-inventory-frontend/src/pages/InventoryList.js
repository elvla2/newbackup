import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/api'; 
import { Link, useNavigate } from 'react-router-dom';
import '../styles/inventory.css';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(id);
      fetchInventory(); // Refresh list after deletion
    }
  };

  return (
    <div className="container">
      <h1>Item Inventory</h1>
      <div className="button-container">
        <Link to="/add" className="add-item-button">➕ Add New Item</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>NAME</th>
            <th>MEMORY</th>
            <th>COLOR</th>
            <th>STOCK</th>
            <th>COST</th>
            <th>TOTAL COST</th>
            <th>ACTIONS</th> {/* New column for buttons */}
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
              <td>
                <button className="edit-btn" onClick={() => navigate(`/edit/${item.id}`)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
