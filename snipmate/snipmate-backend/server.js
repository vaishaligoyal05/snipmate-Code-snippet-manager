// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Initialize Express app
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json()); // Parses incoming JSON requests

// // Route Imports
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const snippetRoutes = require('./routes/snippetRoutes'); 

// // Route Handlers
// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/snippets', snippetRoutes); //  Register snippet routes

// // Default route (optional)
// app.get('/', (req, res) => {
//   res.send('SnipMate API is running...');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// CORS CONFIGURATION
app.use(cors({
  origin: "http://localhost:5173", // Frontend origin
  credentials: true                // Allow cookies and auth headers
}));

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const snippetRoutes = require('./routes/snippetRoutes'); 

// Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/snippets', snippetRoutes); // Register snippet routes

// Default route (optional)
app.get('/', (req, res) => {
  res.send('SnipMate API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
