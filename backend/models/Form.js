const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  identity: {
    type: Number,
    require: true,
    length: 11,
  },
  reason: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    default: Math.random().toString(36).substr(2, 8),
  },
  status: {
    // 0: Pending, 1: Completed, -1: Canceled
    type: Number,
    default: 0,
  },
  files: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Form = mongoose.model('Form', FormSchema);