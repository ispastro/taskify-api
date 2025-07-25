
# 🚀 Taskify API: A Cutting-Edge Task Management Backend for Fetan System's Internship

**Taskify API** is a modern, scalable, and secure RESTful API crafted for the **Fetan System's Technology Internship Test Project**. Built with **TypeScript**, **Express**, and **Prisma ORM**, it supports user authentication, task CRUD operations, pagination, and search.

Deployed on **Render** and integrated with a **MySQL database hosted by TiDB Cloud**, it showcases production-ready architecture, robust error handling, and developer-friendly workflow.

---

## 🌟 Key Features

- 🔒 **Secure User Authentication** – JWT-based signup, login, and profile retrieval with bcrypt hashing.
- 📋 **Task Management** – Create, read, update, and delete tasks with status tracking.
- 🔍 **Pagination & Search** – Efficient listing with query-based filters.
- 🛡️ **Robust Error Handling** – Timestamped logs and meaningful error messages.
- 🛠️ **Type-Safe Development** – TypeScript with custom Express types.
- 💾 **Database Integration** – Prisma ORM with TiDB MySQL backend.
- ⚙️ **Development Workflow** – Modular code, Nodemon, and Prisma CLI.
- 🚀 **Production-Ready** – Deployed on Render with env-based configs.

---

## 🛠️ Technology Stack

| Category         | Technology                           |
|------------------|---------------------------------------|
| Language         | TypeScript                            |
| Framework        | Express.js                            |
| ORM              | Prisma                                |
| Database         | MySQL (hosted by TiDB Cloud)          |
| Auth             | JWT + bcrypt                          |
| Tools            | ts-node, Nodemon, Postman             |
| Deployment       | Render                                |
| Node.js Version  | 18+                                   |

---

## 🎯 Internship Context – Fetan System

Taskify API showcases skills in:

- **Backend Development** – RESTful API design using Express + TypeScript.
- **Database Management** – Schema design and integration with Prisma + MySQL.
- **Security Best Practices** – JWT & password hashing.
- **Error Handling** – Stack traces, logs, and proper HTTP status codes.
- **Workflow Optimization** – With tools like Nodemon, Postman, and migration scripts.
- **Deployment** – Fully functional production deployment on Render.

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [MySQL 8+](https://www.mysql.com/) or [TiDB Cloud](https://tidbcloud.com/)
- [Postman](https://www.postman.com/)
- [Git](https://git-scm.com/)
  

### 📦 Installation
----------------

```bash
git clone https://github.com/ispastro/taskify-api.git
cd taskify-api
npm install

⚙️ Configuration
Create a .env file:

env
DATABASE_URL="mysql://user:password@host:port/task_manager"
JWT_SECRET="your_secure_jwt_secret_key"
💡 Use TiDB Cloud to get the DATABASE_URL.


🧱 Database Setup
bash
Copy
Edit
npm run prisma:generate
npm run prisma:migrate
🚀 Start Server
Development:

bash
Copy
Edit
npm run dev
Production:

bash
Copy
Edit
npm run build && npm start
Visit: http://localhost:8000

📚 API Documentation

🔐 Authentication

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| POST   | `/api/auth/signup`  | Register new user         |
| POST   | `/api/auth/login`   | Login and get JWT token   |
| GET    | `/api/auth/profile` | Get authenticated profile |

Example: Signup
json

POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
📋 Task Management

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/api/tasks`     | Create task        |
| GET    | `/api/tasks`     | List tasks (query) |
| PATCH  | `/api/tasks/:id` | Update task status |
| DELETE | `/api/tasks/:id` | Delete task        |


Example: Create a Task
bash

curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name": "Complete project report"}'
Example Response:
json
Copy
Edit
{
  "id": 1,
  "name": "Complete project report",
  "status": "pending",
  "userId": 1,
  "createdAt": "2025-07-25T12:17:00.000Z",
  "updatedAt": "2025-07-25T12:17:00.000Z"
}
❌ Error Handling Example
json

{
  "error": "Task name is required"
}
🧪 Testing with Postman
Create a collection: Taskify API

Add endpoints for /auth and /tasks

Use environment variable for JWT token

Test success and failure cases

🚀 Deployment on Render
Live Preview: https://taskify-api-qoc6.onrender.com

🔧 Deployment Settings
Setting	Value
Platform	Render (free tier)
Node Version	18.x (via .node-version)
Build Command	npm install && npm run build
Start Command	npm start
Environment Vars	DATABASE_URL, JWT_SECRET

📋 Steps
Push to GitHub:

bash

git add .
git commit -m "Deploy to Render"
git push origin main
On Render:

Click “New Web Service”

Connect to ispastro/taskify-api

Configure build/start commands and env variables

🧱 Codebase Structure
bash


taskify-api/
├── src/
│   ├── config/          # DB setup (Prisma)
│   ├── controllers/     # API logic
│   ├── middleware/      # Auth & errors
│   ├── prisma/          # Schema & migrations
│   ├── routes/          # Route handlers
│   ├── types/           # TypeScript types
│   └── index.ts         # Entry point
├── dist/                # Compiled code
├── .env                 # Secrets
├── package.json         # Scripts/deps
├── tsconfig.json        # TS config
├── nodemon.json         # Dev config
└── .node-version        # Node version

🔧 Scripts

Command	Description
npm run dev	Start dev server (Nodemon)
npm run build	Compile TS
npm start	Start production server
npm run prisma:generate	Generate Prisma client
npm run prisma:migrate	Apply dev migrations
npm run prisma:migrate:deploy	Migrate production DB

🔒 Security Considerations
JWT tokens expire in 1 hour

Passwords hashed with bcrypt (10 salt rounds)

Env vars must be kept secret in production

CORS policy should be restricted in prod

🤝 Contributing
Fork the repo:

bash

git clone https://github.com/ispastro/taskify-api.git
Create a feature branch:

bash

git checkout -b feature/new-feature
Follow coding conventions

Submit a pull request

📄 License
MIT License

📬 Contact
Email: haileasaye51@gmail.com

GitHub: @ispastro



🌟 Why Taskify API Stands Out
Taskify API reflects precision, problem-solving, and modern backend engineering tailored for Fetan System’s internship. With a clean structure, solid deployment, and production-grade practices, it serves as an ideal test project and a potential foundation for real-world task management systems.

Thank you for reviewing! 🚀 Let Taskify API inspire your next big idea!


