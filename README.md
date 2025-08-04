# 🛡️ QuestLog

**QuestLog** is a full-stack, fantasy-themed **project and task management application** where users become "Heroes," projects are "Quests," and tasks are "Objectives." Designed with gamification in mind, QuestLog motivates productivity by turning goal tracking into an engaging adventure with leveling, XP rewards, avatars, and team collaboration.

## 🚀 Table of Contents

- [📜 Features](#-features)
- [⚙️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🌐 Deployment](#-deployment)
- [🔑 Environment Variables](#-environment-variables)
- [🧪 API Endpoints](#-api-endpoints)
- [🛠️ Development Notes](#️-development-notes)

- ## 📜 Features

- 🔐 **User Authentication** with JWT (Register, Login, Logout)
- 🧝 **Hero Profiles** with avatars, XP, and level tracking
- 🗺️ **Quest Management** (Create, View, Update, Delete)
- ✅ **Objective Tracking** inside quests
- 🏆 **XP Rewards & Leveling Up** for completing tasks
- 🤝 **Team Collaboration** (join quests, invite others)
- 🧰 **Protected Routes** with token-based access control
- 🎨 **Fully Responsive UI** using React
- 🧪 **RESTful API** with proper error handling
- ☁️ **Live Deployment** on Vercel (Frontend) & Render (Backend)

---

## ⚙️ Tech Stack

### Frontend
- **React.js** (Vite)
- **React Router DOM**
- **Context API** for global auth state
- **Tailwind CSS / CSS modules**

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **bcrypt** for password hashing
- **CORS** for secure frontend-backend communication

---

## 📦 Installation

# 🖥️ Backend Setup

### Clone the backend repo
- git clone https://github.com/callmesophiii/questlog-backend.git
- cd questlog-backend

### Install dependencies
- npm install

### Create .env file

### Run locally: npm run dev

# 🖥️ Frontend Setup

### Clone the frontend repo
- git clone https://github.com/callmesophiii/questlog-frontend.git
- cd questlog-frontend

### Install dependencies
- npm install

### Create .env file

### Run locally: npm run dev

---

## 🌐 Deployment
- Frontend: https://questlog-frontend.vercel.app

- Backend: https://questlog-backend-gbix.onrender.com

## 🔑 Environment Variables
- PORT:	Port the backend server runs on
MONGO_URI:	MongoDB connection string
JWT_SECRET:	Secret key to sign JWT tokens
VITE_BACKEND_URL:	Used in frontend to connect the API

---

## 🧪 API Endpoints

- POST	/api/auth/register:	Register new hero
- POST	/api/auth/login:	Login hero and return token

---

## 🧝 Hero

- GET	/api/heroes/me:	Get current hero profile
- PUT	/api/heroes/avatar:	Update hero avatar image

---

## 🗺️ Quests

- GET	/api/quests:	Get all quests for logged-in hero
- GET	/api/quests/:id :	Get single quest by ID
- POST	/api/quests:	Create a new quest
- PUT	/api/quests/:id :	Update quest (only owner)
- DELETE	/api/quests/:id :	Delete quest (only owner)
- PUT	/api/quests/:id/join:	Join an existing quest
- PUT	/api/quests/:id/invite:	Invite another hero to the quest

---

## ✅ Objectives
- GET	/api/quests/:questId/objectives:	Get all objectives for a quest
- POST	/api/quests/:questId/objectives:	Create a new objective
- PUT	/api/quests/:questId/objectives/:objectiveId :	Update status or details
- DELETE	/api/quests/:questId/objectives/:objectiveId :	Delete an objective

---

## 🛠️ Development Notes
🔒 Protected routes with middleware checking req.hero

📦 Organized controllers & routes for modularity

🧪 Error messages returned in JSON format

