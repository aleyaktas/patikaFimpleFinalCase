const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');
const Form = require('../models/Form');

// @route   GET /api/comments/:formId
// @desc    Get all comments by form id
// @access  public
router.get('/:formId', async (req, res) => {
  try {
    const comments = await Comment.find({
      form: req.params.formId,
    }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/comments/:formId
// @desc    Create a comment to form
// @access  Private
router.post('/:formId', auth, async (req, res) => {
  const { comment } = req.body;

  const findForm = await Form.findById(req.params.formId);

  if (!findForm) {
    return res.status(404).json({
      msg: 'Form bulunamadı',
    });
  }

  try {
    const newComment = new Comment({
      form: req.params.formId,
      comment,
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

module.exports = router;
