# TaskPilot AI – Intelligent Task Management with Prioritization & Insights

A full-stack AI-powered task management application built with React, Vite, Tailwind CSS, Node.js, Express, and MongoDB. TaskPilot AI helps you manage your to-do list with authentication, persistence, and **AI-based prioritization and daily summaries** powered by **Google Gemini Pro API**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack & Dependencies](#tech-stack--dependencies)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [How to Use](#how-to-use)
- [What I Learned](#what-i-learned)
- [Challenges & Solutions](#challenges--solutions)
- [Demo Video](#demo-video)
- [License](#license)

---

## Features

- User authentication (signup/login) with JWT
- Secure password hashing (bcryptjs)
- Add, view, complete, and delete to-do items
- Each user has their own to-do list (multi-user support)
- Responsive, modern UI with Tailwind CSS and Heroicons
- Persistent storage with MongoDB
- **AI Assistant for Task Insights and Prioritization**
  - Daily task summaries
  - Distributed, intelligent task priority suggestions (unique priorities for up to 5 tasks)
  - Visual priority badges (Critical, High, Medium, Low, Minimal)
- Error handling and user feedback
- Environment variable support for secure configuration

---

## Tech Stack & Dependencies

### Frontend

- **React**: UI library
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **@heroicons/react**: SVG icons
- **ESLint**: Linting and code quality
- **React Context API**: Auth state management

### Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **dotenv**: Environment variable management
- **cors**: Cross-origin resource sharing
- **body-parser**: Request parsing
- **express-validator**: Input validation
- **nodemon**: Dev server auto-reload
- **Google Gemini API**: AI-powered insights and prioritization

---

## Project Structure

```
todo-backend/
  app.js
  .env.example
  controllers/
    authController.js
    errors.js
    todoItemsController.js
  middleware/
    authMiddleware.js
  models/
    TodoItem.js
    User.js
  public/
    home.css
    output.css
  routes/
    authRouter.js
    todoItemsRouter.js
  services/
    aiService.js
  utils/
    pathUtil.js
  package.json
  tailwind.config.js
todo-frontend/
  index.html
  package.json
  vite.config.js
  public/
    vite.svg
  src/
    App.css
    App.jsx
    main.jsx
    assets/
      react.svg
    components/
      AddTodo.jsx
      AppName.jsx
      DailySummary.jsx
      itemsService.js
      Login.jsx
      PriorityBadge.jsx
      Signup.jsx
      TodoItem.jsx
      TodoItems.jsx
      WelcomeMessage.jsx
    context/
      AuthContext.jsx
    services/
      aiService.js
      authService.js
      itemsService.js
```

---

## Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)
- Google account to access Gemini API (or any AI provider of your choice)

### 1. Clone the repository

```bash
git clone https://github.com/SACHDEVA-GARV/TaskPilot-AI
cd TaskPilot-AI
```

### 2. Backend Setup

```bash
cd todo-backend
cp .env.example .env
# Edit .env and fill in your MongoDB connection string, JWT secret, and Gemini API key
npm install
npm start
```

### 3. Frontend Setup

```bash
cd ../todo-frontend
npm install
npm run dev
```

### 4. Access the App

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3001](http://localhost:3001)

---

## Environment Variables

Copy `.env.example` to `.env` in the `todo-backend` folder and fill in:

- `PORT`: Backend server port (default: 3001)
- `MONGO_URL`: Your MongoDB connection string
- `JWT_SECRET`: A strong secret for JWT signing
- `GEMINI_API_KEY`: Your API key from Google AI Studio

---

## How to Use

1. **Sign up** for a new account.
2. **Log in** with your credentials.
3. **Add, complete, or delete** to-do items.
4. Click **Summarize My Day** to get AI-powered prioritization and summaries.
5. Click **Update Priorities** to let the AI assign and distribute unique priorities to your tasks.
6. **Log out** securely.

---

## What I Learned

- Full-stack app architecture and separation of concerns
- Secure authentication with JWT and password hashing
- RESTful API design and error handling
- State management with React Context and hooks
- Responsive UI with Tailwind CSS and icon libraries
- Environment variable management for security
- AI integration for enhancing productivity
- Prompt engineering for better AI results
- Debugging and troubleshooting real-world issues

---

## Challenges & Solutions

- **JWT Authentication:** Ensured the same secret is used for signing and verifying tokens, and handled token expiration and errors gracefully.
- **AI Priority Distribution:** The biggest challenge was getting the AI (Gemini) to assign different, sensible priorities to each task. By engineering a more context-rich prompt and adding backend logic to force unique priorities for up to 5 tasks, we overcame Gemini's tendency to return the same number for all tasks. For larger lists, priorities are distributed evenly and sensibly.
- **AI Integration:** Adapted the Gemini API to understand custom prompt formats and parse results to fit UI components.
- **Unique Index Errors:** Resolved MongoDB unique index issues by cleaning up unused indexes and aligning the schema with the code.
- **Persistent State:** Ensured the frontend always syncs with the backend for reliable data persistence.
- **UI/UX:** Enhanced forms with icons and proper cursor styles for a professional look and feel.
- **Error Handling:** Provided user-friendly error messages and handled edge cases (e.g., duplicate emails, invalid tokens).

---

## Demo Video

[\[Demo video link here\]
](https://drive.google.com/file/d/1253PgBkMQorTb5uiOfDaRMCxyyyl43Y7/view?usp=sharing)
---

## License

This project is for educational and interview purposes.

---

**Feel free to reach out if you have any questions or feedback!**
