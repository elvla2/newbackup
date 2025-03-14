const API_URL = 'http://localhost:5000/api/phones';

export const getItems = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const getItemById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const addPhone = async (item) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const updateItem = async (id, item) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const deleteItem = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
