const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();          // Load environment variables

const app = express();    // ✅ Define app before using it

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);  // ✅ Now safe to use

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
