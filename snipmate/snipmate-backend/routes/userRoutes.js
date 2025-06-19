// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');

// // GET /api/user/profile
// router.get('/profile', protect, (req, res) => {
//   res.status(200).json({
//     message: 'Welcome to your profile!',
//     user: req.user
//   });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Protected: Get user profile
router.get('/profile', protect, getUserProfile);
      
module.exports = router;
