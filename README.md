# Intelli-Task AI (Java / Spring Boot Edition)

### Project Status: Active Migration (As of September 24, 2025)

This repository documents the development of Intelli-Task AI, a secure, full-stack task management application featuring AI-powered prioritization and daily summaries.

**Current Status:** The application is being actively migrated from a stable **MERN stack proof-of-concept** to a more scalable and enterprise-ready **Java Spring Boot architecture**. The initial commit contains the working code from the MERN version to establish a functional baseline and showcase the core features. The full Java backend structure will be pushed shortly to replace this baseline.

---

## Table of Contents

- [Features](#features)
- [Target Tech Stack](#target-tech-stack)
- [Target Project Structure](#target-project-structure)
- [Target Setup & Installation](#target-setup--installation)
- [Environment Variables (for Java Backend)](#environment-variables-for-java-backend)
- [How to Use](#how-to-use)
- [Project Objectives & Learning Goals](#project-objectives--learning-goals)
- [Anticipated Challenges & Solutions](#anticipated-challenges--solutions)
- [Demo Video (of v1.0 MERN Proof-of-Concept)](#demo-video-of-v10-mern-proof-of-concept)
- [License](#license)

---

## Features

- **User Authentication:** Secure signup and login functionality with JWT.
- **Multi-User Support:** Each user has their own private to-do list.
- **Full CRUD Functionality:** Add, view, complete, and delete to-do items.
- **AI Assistant:** Integration with Google Gemini API for:
    - Daily task summaries.
    - Distributed, intelligent task priority suggestions.
    - Visual priority badges (Critical, High, Medium, Low).
- **Responsive UI:** A modern, mobile-first user interface built with React and Tailwind CSS.
- **Persistent Storage:** Reliable data storage in a relational database.

---

## Target Tech Stack

### Backend
- **Language/Framework:** Java, Spring Boot
- **Security:** Spring Security (for JWT Authentication)
- **Database:** Spring Data JPA, MySQL
- **Build Tool:** Maven
- **Testing:** JUnit
- **DevOps:** Docker, AWS (Elastic Beanstalk), CI/CD with GitHub Actions

### Frontend
- **Library/Framework:** React, Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Icons:** @heroicons/react

---

## Target Project Structure

The final project will follow a standard Maven and Create React App structure to ensure separation of concerns.

```
Backend (Spring Boot)
intelli-task-backend/
├── src/main/java/com/your-domain/intellitask/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   ├── service/
│   └── security/
├── src/main/resources/
│   └── application.properties
└── pom.xml

Frontend (React)
intelli-task-frontend/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   └── services/
├── package.json
└── vite.config.js
```

---

## Target Setup & Installation

### Prerequisites
- Java JDK (v17+ recommended)
- Apache Maven
- Node.js (v18+ recommended)
- MySQL Server

### 1. Backend Setup
```bash
cd intelli-task-backend
# Create and fill in application.properties from application.properties.example
mvn spring-boot:run
```

### 2. Frontend Setup
```bash
cd intelli-task-frontend
npm install
npm run dev
```

---

## Environment Variables (for Java Backend)

Create an `application.properties` file in `src/main/resources/` with the following keys:

- `server.port`: Backend server port (e.g., 8080)
- `spring.datasource.url`: Your MySQL connection string (e.g., `jdbc:mysql://localhost:3306/intellitaskdb`)
- `spring.datasource.username`: Your MySQL username
- `spring.datasource.password`: Your MySQL password
- `jwt.secret`: A strong secret for JWT signing
- `gemini.api.key`: Your API key from Google AI Studio

---

## How to Use

1. **Sign up** for a new account.
2. **Log in** with your credentials.
3. **Add, complete, or delete** to-do items.
4. Click **Summarize My Day** to get AI-powered prioritization and summaries.

---

## Project Objectives & Learning Goals

The primary goal of this migration is to re-architect a successful prototype into an enterprise-grade application. Key objectives include:

- Building a highly scalable, type-safe backend using Java and the Spring Boot ecosystem.
- Implementing robust security patterns with Spring Security.
- Mastering containerization (Docker) and cloud deployment (AWS) for a full-stack application.
- Applying SDLC best practices, including unit testing (JUnit) and setting up a CI/CD pipeline (GitHub Actions).
- Deepening knowledge of relational database design and ORM with Spring Data JPA.

---

## Anticipated Challenges & Solutions

- **Data Model Migration:** The primary challenge will be translating schema-less MongoDB data models (from Mongoose) into structured, relational JPA Entities for MySQL, ensuring data integrity.
- **Authentication Refactoring:** The logic for creating, signing, and validating JWTs will be re-implemented from scratch using the robust Spring Security framework.
- **API Contract Consistency:** Care will be taken to ensure the new Java-based REST API maintains the same contract (endpoints, request/response bodies) as the original Node.js API to prevent breaking the existing React frontend.

---

## Demo Video (of v1.0 MERN Proof-of-Concept)

**Note:** This video demonstrates the fully functional v1.0 proof-of-concept built on the MERN stack. The user experience and core features will be identical in the final Java version.

[**Watch the Demo on Google Drive**](https://drive.google.com/file/d/1253PgBkMQorTb5uiOfDaRMCxyyyl43Y7/view?usp=sharing)

---

## License

This project is for educational and portfolio purposes.