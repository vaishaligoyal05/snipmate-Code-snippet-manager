const Snippet = require('../models/Snippet');

// @desc Create a new snippet
// @route POST /api/snippets
// @access Private
const createSnippet = async (req, res) => {
  try {
    const { title, code, language, description } = req.body;

    if (!title || !code) {
      return res.status(400).json({ message: 'Title and code are required' });
    }

    const newSnippet = await Snippet.create({
      user: req.user._id,
      title,
      code,
      language,
      description,
    });

    res.status(201).json(newSnippet);
  } catch (error) {
    console.error("Create snippet error:", error.message);
    res.status(500).json({ message: 'Failed to create snippet', error: error.message });
  }
};

// @desc Get all snippets for the logged-in user
// @route GET /api/snippets
// @access Private
const getUserSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(snippets);
  } catch (error) {
    console.error("Get snippets error:", error.message);
    res.status(500).json({ message: 'Failed to fetch snippets', error: error.message });
  }
};

// @desc Get a single snippet by ID
// @route GET /api/snippets/:id
// @access Private
const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json(snippet);
  } catch (error) {
    console.error("Get snippet by ID error:", error.message);
    res.status(500).json({ message: 'Failed to fetch snippet', error: error.message });
  }
};

// @desc Update a snippet
// @route PUT /api/snippets/:id
// @access Private
const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const { title, code, language, description } = req.body;

    snippet.title = title || snippet.title;
    snippet.code = code || snippet.code;
    snippet.language = language || snippet.language;
    snippet.description = description || snippet.description;

    const updatedSnippet = await snippet.save();
    res.status(200).json(updatedSnippet);
  } catch (error) {
    console.error("Update snippet error:", error.message);
    res.status(500).json({ message: 'Failed to update snippet', error: error.message });
  }
};

// @desc Delete a snippet
// @route DELETE /api/snippets/:id
// @access Private
const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await snippet.deleteOne();
    res.status(200).json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error("Delete snippet error:", error.message);
    res.status(500).json({ message: 'Failed to delete snippet', error: error.message });
  }
};

module.exports = {
  createSnippet,
  getUserSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
};
