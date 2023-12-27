const mongoose = require('mongoose');
require('./Form');

const CommentSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
  },
  comment: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);
