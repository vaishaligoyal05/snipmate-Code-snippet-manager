const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// GET /api/user/profile
router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'Welcome to your profile!',
    user: req.user
  });
});

module.exports = router;
