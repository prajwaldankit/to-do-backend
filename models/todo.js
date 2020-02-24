const mongoose = require("mongoose");
const SubTask = require("./subtask");
const Schema = mongoose.Schema;

const todoSchema = Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  subTodos: [SubTask],
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
