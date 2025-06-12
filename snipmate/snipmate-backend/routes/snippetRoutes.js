const express = require('express');
const router = express.Router();
const {
  createSnippet,
  getUserSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
} = require('../controllers/snippetController');
const { protect } = require('../middleware/authMiddleware');

// Create a snippet
router.post('/', protect, createSnippet);

// Get all snippets for logged-in user
router.get('/', protect, getUserSnippets);

// Get a single snippet by ID
router.get('/:id', protect, getSnippetById);

// Update a snippet
router.put('/:id', protect, updateSnippet);

// Delete a snippet
router.delete('/:id', protect, deleteSnippet);

module.exports = router;
