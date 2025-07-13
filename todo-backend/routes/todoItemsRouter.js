
const express = require("express");
const router = express.Router();
const todoItemsController = require("../controllers/todoItemsController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", todoItemsController.getTodoItems);
router.post("/", todoItemsController.createTodoItem);
router.delete("/:id", todoItemsController.deleteTodoItem);
router.put("/:id/completed", todoItemsController.markCompleted);

// New AI-powered endpoints
router.get("/ai/daily-summary", todoItemsController.getDailySummary);
router.post("/ai/update-priorities", todoItemsController.updatePriorities);

module.exports = router;