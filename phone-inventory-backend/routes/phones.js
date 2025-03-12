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
    const { name, brand, price, stock } = req.body;
    const newPhone = await pool.query(
      'INSERT INTO phones (name, brand, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, brand, price, stock]
    );
    res.json(newPhone.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
