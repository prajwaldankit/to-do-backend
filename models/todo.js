const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  authorId: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Todo", todoSchema);
