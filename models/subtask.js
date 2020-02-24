const mongoose = require("mongoose");

const subTaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  createdAt: {
    type: String,
    required: true
  },
  priority: {
    type: String
  },
  checked: {
    type: Boolean,
    required: true
  }
});

module.exports = subTaskSchema;
// module.exports = mongoose.model("SubTask", subTaskSchema);
