const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subTaskSchema = Schema({
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
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User"
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
