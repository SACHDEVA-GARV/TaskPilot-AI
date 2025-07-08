const mongoose = require("mongoose");

const todoItemSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: Date,
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("TodoItem", todoItemSchema);
