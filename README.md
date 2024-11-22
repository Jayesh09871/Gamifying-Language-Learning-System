# Gamifying Language Learning System

## Project Overview

The **Gamifying Language Learning System** is a platform designed to help users learn languages in a fun, interactive, and engaging way. The system provides gamified lessons, quizzes, and progress tracking to keep learners motivated. Users can sign up, access language lessons, take quizzes, track their progress, and compete on leaderboards.

## Technology Stack

The application uses the **MERN stack**:

- **MongoDB** for the database
- **Express.js** for the backend server
- **React.js** for the frontend user interface
- **Node.js** for the server-side runtime

The backend uses **JWT** for authentication, **Mongoose** for database interaction, and the frontend is built with **React** with dynamic components.


## Project Structure

This is the basic structure of the Gamifying Language Learning System project.

### Root Directory

Language-Learning-System
├── backend
│   ├── index.js
│   └── src
│       ├── middleware
│       │   └── auth
│       │       └── auth.middleware.js
│       ├── models
│       │   ├── user.model.js
│       │   ├── lesson.model.js
│       │   └── quiz.model.js
│       ├── routes
│       │   ├── auth
│       │   │   └── auth.route.js
│       │   ├── lessons
│       │   │   └── lessons.route.js
│       │   ├── quizzes
│       │   │   └── quizzes.route.js
│       │   ├── users
│       │   │   └── users.route.js
│       │   └── index.js
│       ├── services
│       │   ├── auth.service.js
│       │   ├── lesson.service.js
│       │   ├── quiz.service.js
│       │   └── user.service.js
│       ├── setups
│       │   ├── database
│       │   │   └── database.setup.js
│       │   ├── logger
│       │   │   └── logger.setup.js
│       │   └── server
│       │       └── server.setup.js
│       └── utilities
│           ├── jwt.utility.js
│           ├── encrypt.utility.js
│           └── progress.utility.js
└── frontend
    ├── public
    │   ├── index.html
    │   └── manifest.json
    ├── src
    │   ├── components
    │   │   ├── Navbar.js
    │   │   ├── LessonCard.js
    │   │   ├── QuizCard.js
    │   │   └── ProgressTracker.js
    │   ├── contexts
    │   │   ├── AuthContext.js
    │   │   └── UserContext.js
    │   ├── hooks
    │   │   └── useFetch.js
    │   ├── pages
    │   │   ├── Home.js
    │   │   ├── Lessons.js
    │   │   ├── Quizzes.js
    │   │   ├── Leaderboard.js
    │   │   └── Profile.js
    │   ├── services
    │   │   ├── auth.service.js
    │   │   ├── lesson.service.js
    │   │   └── quiz.service.js
    │   ├── utils
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.js
    │   └── styles
    │       ├── App.module.css
    │       ├── LessonCard.module.css
    │       └── Navbar.module.css
    └── .env


## Description of Key Folders and Files

### Backend (`/backend`)
- **index.js**: Entry point for the server, sets up Express and middleware.
- **middleware/auth**: Handles user authentication (JWT verification).
- **models**: Contains Mongoose schemas for user, lesson, and quiz data.
- **routes**: API routes for different functionalities like authentication, lessons, and quizzes.
- **services**: Contains business logic for interacting with models (e.g., user authentication, fetching lessons).
- **setups**: Configuration files for server, database, and logging setup.
- **utilities**: Utility functions like JWT encryption, user progress tracking, etc.

### Frontend (`/frontend`)
- **public**: Static files like `index.html` and manifest file.
- **components**: React components for UI elements such as Navbar, Lesson Card, Quiz Card, etc.
- **contexts**: React Contexts for global state management (user authentication, user data).
- **hooks**: Custom React hooks for data fetching.
- **pages**: React pages like Home, Lessons, Quizzes, Profile, etc.
- **services**: Functions for making API calls to the backend.
- **styles**: CSS Modules for component-specific styling (modular and scoped CSS).
- **.env**: Stores environment variables for frontend (e.g., API URL).

# Usage

### 1. Sign Up and Log In:
- Visit [http://localhost:3000](http://localhost:3000) to access the frontend.
- Sign up with your details and log in to access lessons and quizzes.

### 2. Start Learning:
- After logging in, browse through various language lessons available.
- Complete quizzes to earn points and unlock new levels.

### 3. View Progress:
- Track your progress through the dashboard where your scores and achievements are displayed.

### 4.Leaderboard:
- Check out the leaderboard to see how you rank compared to other users.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

