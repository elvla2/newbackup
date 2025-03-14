const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all phones
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM phones ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a phone
router.post('/', async (req, res) => {
  try {
    const { name, sku, memory, color, stock, price } = req.body;

    const newItem = await pool.query(
      'INSERT INTO phones (name, sku, memory, color, stock, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, sku, memory, color, stock, price]
    );

    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/totals', async (req, res) => {
  try {
    const totalPhones = await pool.query('SELECT COUNT(*) AS total_products FROM phones');
    const totalStock = await pool.query('SELECT SUM(stock) AS total_stock FROM phones');
    const totalValue = await pool.query('SELECT SUM(price * stock) AS total_value FROM phones');

    res.json({
      totalProducts: totalPhones.rows[0].total_products,
      totalStock: totalStock.rows[0].total_stock,
      totalValue: totalValue.rows[0].total_value
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Delete a phone
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await pool.query('DELETE FROM phones WHERE id = $1 RETURNING *', [id]);

    if (deletedItem.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//Edit a phone
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { sku, name, memory, color, stock, price } = req.body;

    const updatedItem = await pool.query(
      `UPDATE phones SET sku = $1, name = $2, memory = $3, color = $4, stock = $5, price = $6 WHERE id = $7 RETURNING *`,
      [sku, name, memory, color, stock, price, id]
    );

    if (updatedItem.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(updatedItem.rows[0]);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
