const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const turfsRoute = require('./routes/turfs');
const path = require('path');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/turfs', turfsRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
