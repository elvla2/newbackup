import React, { useState } from 'react';
import { addPhone } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({ name: '', brand: '', price: '', stock: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPhone(formData);
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Add New Phone</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Phone Name" onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Brand" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" onChange={handleChange} required />
        <button type="submit">Add Phone</button>
      </form>
    </div>
  );
};

export default AddProduct;
