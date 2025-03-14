import React, { useState, useEffect, useCallback } from 'react';
import { getItemById, updateItem } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/form.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    memory: '',
    color: '',
    stock: '',
    price: ''
  });

  // ✅ Use `useCallback` to memoize the function
  const fetchItem = useCallback(async () => {
    const item = await getItemById(id);
    setFormData({
      ...item,
      stock: item.stock.toLocaleString(),
      price: item.price.toLocaleString()
    });
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]); // ✅ Add fetchItem as a dependency

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Submitting data:", formData); // Debugging output
  
    try {
      const response = await updateItem(id, {
        ...formData,
        stock: parseInt(formData.stock.replace(/,/g, '')),
        price: parseFloat(formData.price.replace(/,/g, ''))
      });
  
      console.log("Update response:", response); // Debugging output
  
      navigate('/');
    } catch (error) {
      console.error("Error updating item:", error); // Debugging output
      alert("Failed to update item. Check console for details.");
    }
  };
  

  return (
    <div className="container">
      <h2>Edit Item</h2>

      <button className="back-button" onClick={() => navigate('/')}>← Back to Inventory</button>

      <form onSubmit={handleSubmit}>
        <input type="text" name="sku" value={formData.sku} onChange={handleChange} required placeholder="Enter SKU" />
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter Item Name" />
        <input type="text" name="memory" value={formData.memory} onChange={handleChange} required placeholder="Enter Memory (e.g., 128GB)" />
        <input type="text" name="color" value={formData.color} onChange={handleChange} required placeholder="Enter Color (e.g., Black)" />
        <input type="text" name="stock" value={formData.stock} onChange={handleChange} required placeholder="Enter Stock Quantity" />
        <input type="text" name="price" value={formData.price} onChange={handleChange} required placeholder="Enter Price (e.g., 499.99)" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
