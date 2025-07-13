
const TodoItem = require("../models/TodoItem");
const aiService = require("../services/aiService");

exports.createTodoItem = async (req, res) => {
  try {
    const { task, date } = req.body;
    
    // Generate AI priority for the new task
    const aiPriority = await aiService.generateTaskPriority(task, date);
    
    const todoItem = new TodoItem({ 
      task, 
      date, 
      user: req.user._id,
      aiPriority 
    });
    
    await todoItem.save();
    res.status(201).json(todoItem);
  } catch (error) {
    console.error('Error creating todo item:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getTodoItems = async (req, res) => {
  try {
    const todoItems = await TodoItem.find({ user: req.user._id });
    res.json(todoItems);
  } catch (error) {
    console.error('Error fetching todo items:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.deleteTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    await TodoItem.deleteOne({ _id: id, user: req.user._id });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo item:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

exports.markCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const todoItem = await TodoItem.findOne({ _id: id, user: req.user._id });
    
    if (!todoItem) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Toggle completed if requested, else set to true
    if (typeof req.body.completed === "boolean") {
      todoItem.completed = req.body.completed;
    } else {
      todoItem.completed = !todoItem.completed;
    }
    
    await todoItem.save();
    res.json(todoItem);
  } catch (error) {
    console.error('Error updating todo item:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.getDailySummary = async (req, res) => {
  try {
    const todoItems = await TodoItem.find({ user: req.user._id });
    const summary = await aiService.generateDailySummary(todoItems);
    res.json({ summary });
  } catch (error) {
    console.error('Error generating daily summary:', error);
    res.status(500).json({ error: 'Failed to generate daily summary' });
  }
};

exports.updatePriorities = async (req, res) => {
  try {
    const todoItems = await TodoItem.find({ user: req.user._id });
    const updatedTasks = await aiService.bulkUpdatePriorities(todoItems);
    
    // Save updated priorities to database
    for (const task of updatedTasks) {
      if (task.aiPriority && task._id) {
        await TodoItem.findByIdAndUpdate(task._id, { aiPriority: task.aiPriority });
      }
    }
    
    res.json({ message: 'Priorities updated successfully' });
  } catch (error) {
    console.error('Error updating priorities:', error);
    res.status(500).json({ error: 'Failed to update priorities' });
  }
};