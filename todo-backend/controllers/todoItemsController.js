const TodoItem = require("../models/TodoItem");

exports.createTodoItem = async (req, res) => {
  const { task, date } = req.body;
  const todoItem = new TodoItem({ task, date, user: req.user._id });
  await todoItem.save();
  res.status(201).json(todoItem);
};

exports.getTodoItems = async (req, res) => {
  const todoItems = await TodoItem.find({ user: req.user._id });
  res.json(todoItems);
};

exports.deleteTodoItem = async (req, res) => {
  const { id } = req.params;
  await TodoItem.deleteOne({ _id: id, user: req.user._id });
  res.status(204).send(); // Correct: sends no body
};

exports.markCompleted = async (req, res) => {
  const { id } = req.params;
  const todoItem = await TodoItem.findOne({ _id: id, user: req.user._id });
  if (!todoItem) return res.status(404).json({ error: "Task not found" });

  // Toggle completed if requested, else set to true
  if (typeof req.body.completed === "boolean") {
    todoItem.completed = req.body.completed;
  } else {
    todoItem.completed = !todoItem.completed;
  }
  await todoItem.save();
  res.json(todoItem);
};
