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
    const { name, brand, memory, color, stock, price } = req.body;

    const newItem = await pool.query(
      'INSERT INTO phones (name, brand, memory, color, stock, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, brand, memory, color, stock, price]
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

module.exports = router;
