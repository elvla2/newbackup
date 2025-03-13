import axios from 'axios';

const API_URL = 'http://localhost:5000/api/phones';

export const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPhone = async (phoneData) => {
  const response = await axios.post(API_URL, phoneData);
  return response.data;
};
export const getInventoryTotals = async () => {
  const response = await axios.get('http://localhost:5000/api/phones/totals');
  return response.data;
};