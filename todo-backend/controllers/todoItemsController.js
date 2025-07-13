const TodoItem = require("../models/TodoItem");
const aiService = require("../services/aiService");

exports.createTodoItem = async (req, res) => {
  try {
    const { task, date } = req.body;
    
    // Validate required fields
    if (!task || !task.trim()) {
      return res.status(400).json({ error: 'Task name is required' });
    }
    
    // Generate AI priority for the new task
    const aiPriority = await aiService.generateTaskPriority(task.trim(), date);
    
    const todoItem = new TodoItem({ 
      task: task.trim(), 
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
    const todoItems = await TodoItem.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todoItems);
  } catch (error) {
    console.error('Error fetching todo items:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.deleteTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TodoItem.deleteOne({ _id: id, user: req.user._id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
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
    
    // Filter only pending (incomplete) tasks
    const pendingTasks = todoItems.filter(task => !task.completed);
    
    // If no pending tasks, return a simple message without calling AI
    if (pendingTasks.length === 0) {
      return res.json({ 
        summary: "All your tasks are completed! Great job staying productive." 
      });
    }
    
    const summary = await aiService.generateDailySummary(pendingTasks);
    res.json({ summary });
  } catch (error) {
    console.error('Error generating daily summary:', error);
    res.status(500).json({ error: 'Failed to generate daily summary' });
  }
};

exports.updatePriorities = async (req, res) => {
  try {
    // Only get incomplete tasks
    const todoItems = await TodoItem.find({ 
      user: req.user._id,
      completed: false
    });
    
    console.log(`Found ${todoItems.length} incomplete tasks to update priorities`);
    
    if (todoItems.length === 0) {
      return res.json({ 
        message: 'No incomplete tasks to update',
        updatedCount: 0 
      });
    }
    
    let updatedCount = 0;
    
    // Update priorities for all incomplete tasks
    for (const task of todoItems) {
      const priority = await aiService.generateTaskPriority(task.task, task.date);
      await TodoItem.findByIdAndUpdate(task._id, { 
        aiPriority: priority 
      });
      updatedCount++;
      console.log(`Updated priority for task: ${task.task} -> Priority: ${priority}`);
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    res.json({ 
      message: `Successfully updated priorities for ${updatedCount} tasks`,
      updatedCount 
    });
  } catch (error) {
    console.error('Error updating priorities:', error);
    res.status(500).json({ error: 'Failed to update priorities' });
  }
};