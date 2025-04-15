const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length === 0) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      res.status(200).json({ message: "Login successful", user: user.rows[0] });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  

module.exports = router;
