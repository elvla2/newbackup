import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryList from './pages/InventoryList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct'; // Import EditProduct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InventoryList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} /> {/* Add EditProduct Route */}
      </Routes>
    </Router>
  );
}

export default App;
