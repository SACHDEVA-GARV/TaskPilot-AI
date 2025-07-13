
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
  },
  aiPriority: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("TodoItem", todoItemSchema);