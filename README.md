# TaskFlow – Modern Task Management with Auth & Persistence

A full-stack ToDo application built with React, Vite, Tailwind CSS, Node.js, Express, and MongoDB. This project demonstrates modern web development best practices, authentication, RESTful APIs, and a beautiful, responsive UI.

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
- Error handling and user feedback
- Environment variable support for secure configuration

---

## Tech Stack & Dependencies

### Frontend

- **React**: UI library
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **@heroicons/react**: Beautiful SVG icons
- **ESLint**: Linting and code quality
- **Other**: React Context API for auth, modern hooks

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
- **Tailwind CSS**: For any backend-rendered styles

---

## Project Structure

```
todo-backend/
  app.js
  .env.example
  controllers/
  middleware/
  models/
  public/
  routes/
  utils/
  package.json
  tailwind.config.js
todo-frontend/
  src/
    components/
    context/
    services/
    assets/
    App.jsx
    App.css
    main.jsx
  public/
  package.json
  vite.config.js
README.md
```

---

## Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ToDo\ App
```

### 2. Backend Setup

```bash
cd todo-backend
cp .env.example .env
# Edit .env and fill in your MongoDB connection string and JWT secret
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

---

## How to Use

1. **Sign up** for a new account.
2. **Log in** with your credentials.
3. **Add, complete, or delete** to-do items.
4. **Log out** securely.

---

## What I Learned

- Full-stack app architecture and separation of concerns
- Secure authentication with JWT and password hashing
- RESTful API design and error handling
- State management with React Context and hooks
- Responsive UI with Tailwind CSS and icon libraries
- Environment variable management for security
- Debugging and troubleshooting real-world issues

---

## Challenges & Solutions

- **JWT Authentication:** Ensured the same secret is used for signing and verifying tokens, and handled token expiration and errors gracefully.
- **Unique Index Errors:** Resolved MongoDB unique index issues by cleaning up unused indexes and aligning the schema with the code.
- **Persistent State:** Ensured the frontend always syncs with the backend for reliable data persistence.
- **UI/UX:** Enhanced forms with icons and proper cursor styles for a professional look and feel.
- **Error Handling:** Provided user-friendly error messages and handled edge cases (e.g., duplicate emails, invalid tokens).

---

## Demo Video

[Demo video link here]

---

## License

This project is for educational and interview purposes.

---

**Feel free to reach out if you have any questions or feedback!**
