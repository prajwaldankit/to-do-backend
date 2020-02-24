const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = Schema({
  context: {
    type: String
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  to: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      read: {
        type: Boolean,
        required: true
      }
    }
  ],
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
