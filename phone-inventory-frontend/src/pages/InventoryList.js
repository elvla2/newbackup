import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/api'; 
import { Link, useNavigate } from 'react-router-dom';
import '../styles/inventory.css';
import Papa from 'papaparse';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // ✅ Added state for file selection
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // ✅ Updates state correctly
  };

  const handleCSVUpload = async () => {
    if (!selectedFile) {
      alert("Please select a CSV file first.");
      return;
    }

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true, // ✅ Ignore empty rows
      complete: async (results) => {
        console.log("Parsed CSV Data:", results.data); // Debugging output

        if (!results.data || results.data.length === 0) {
          alert("Error: The CSV file is empty or incorrectly formatted.");
          return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
          const response = await fetch('http://localhost:5000/api/phones/upload-csv', {
            method: 'POST',
            body: formData,
          });

          const result = await response.json();
          alert(result.message);
          fetchInventory(); // Refresh data after update
        } catch (error) {
          console.error("Upload Error:", error);
          alert("Failed to upload CSV. Please try again.");
        }
      },
      error: (error) => {
        console.error("CSV Parsing Error:", error);
        alert('Error reading CSV file: ' + error.message);
      }
    });
  };

  return (
    <div className="container">
      <h1>Item Inventory</h1>
      <div className="button-container">
        <Link to="/add" className="add-item-button">➕ Add New Item</Link>

        {/* CSV Upload Section */}
        <div className="csv-upload-container">
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button className="upload-btn" onClick={handleCSVUpload}>📤 Upload CSV</button>
        </div>
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
              <tr className="totals-row">
              <td colSpan="4"><strong>Total:</strong></td>
              <td><strong>{items.reduce((sum, item) => sum + item.stock, 0).toLocaleString()}</strong></td>
              <td></td>
              <td><strong>${items.reduce((sum, item) => sum + (item.stock * item.price), 0).toLocaleString()}</strong></td>
              <td></td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
