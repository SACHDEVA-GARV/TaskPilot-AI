// ===================
// Core Module
// ===================
const path = require('path');
require('dotenv').config();

// ===================
// External Module
// ===================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ===================
// Local Module
// ===================
const todoItemsRouter = require("./routes/todoItemsRouter");
const authRouter = require("./routes/authRouter");
const errorsController = require("./controllers/errors");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/todo", todoItemsRouter);
app.use("/api/auth", authRouter);

// Error handling (404)
app.use(errorsController.pageNotFound);

// Server + MongoDB
const PORT = process.env.PORT || 3001;
const DB_PATH = process.env.MONGO_URL;

mongoose.connect(DB_PATH)
  .then(() => {
    console.log(' Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(' MongoDB connection error:', err);
  });
