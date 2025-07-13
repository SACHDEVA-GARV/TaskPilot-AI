const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', authController.register);
router.post('/login', authController.login);

// Protected routes (require authentication)
router.get('/profile', authMiddleware, authController.getProfile);
router.delete('/account', authMiddleware, authController.deleteAccount);

module.exports = router;