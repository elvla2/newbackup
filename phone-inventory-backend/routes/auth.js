const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db');
require('dotenv').config();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', req.body);

  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('User found:', user.rows[0]);

    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      console.log('Incorrect password');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Login successful');
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
