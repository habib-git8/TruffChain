const express = require('express');
const router = express.Router();
const multer = require('multer');
const pool = require('../db'); // pg Pool

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  const { name, date, timeSlot, price, category, location, contractaddress } = req.body;

  console.log("Received data:", { name, date, timeSlot, price, category, location, contractaddress }); // Log incoming data

  try {
    const result = await pool.query(
      'INSERT INTO turfs (name, date, time_slot, price, category, location, contractaddress) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, date, timeSlot, price, category, location, contractaddress] // Ensure that all parameters match the query
    );

    console.log('Inserted turf:', result.rows[0]); // Log the successful result
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error occurred while inserting turf:', err); // Log detailed error message
    res.status(500).json({ message: 'Failed to add turf', error: err.message }); // Return detailed error message
  }
});
router.post("/update-booked", async (req, res) => {
  const { turfId } = req.body;

  if (!turfId) {
      return res.status(400).json({ success: false, error: "Missing turfId" });
  }

  try {
      await pool.query("UPDATE turfs SET booked = true WHERE id = $1", [turfId]);
      res.json({ success: true });
  } catch (err) {
      console.error("DB update failed:", err);
      res.status(500).json({ success: false, error: err.message });
  }
});
// routes/turfs.js or similar
router.post('/update-payed', async (req, res) => {
  const { turfId, payed } = req.body;

  try {
    const result = await pool.query('UPDATE turfs SET payed = $1 WHERE id = $2', [payed, turfId]);
    res.json({ message: 'Payment status updated', result });
  } catch (err) {
    console.error('Error updating payed:', err);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM turfs');
    // Check the result here, especially the contractaddress field
    // console.log('Fetched result:', result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching turfs:', err);
    res.status(500).json({ message: 'Failed to fetch turfs' });
  }
});
  
module.exports = router;
