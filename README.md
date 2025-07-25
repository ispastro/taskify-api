🚀 Taskify API: A Cutting-Edge Task Management Backend for Fetan System's Internship

Taskify API is a modern, scalable, and secure RESTful API crafted for the Fetan System's Technology Internship Test Project. Built with TypeScript, Express, and Prisma ORM, it powers efficient task management with secure user authentication, task CRUD operations, pagination, and search functionality. Deployed on Render and integrated with a MySQL database hosted by TiDB remote, this project showcases production-ready architecture, robust error handling, and a developer-friendly workflow.
Designed to exceed the high standards of Fetan System’s internship evaluation, Taskify API demonstrates expertise in backend development, API design, database management, and cloud deployment. Whether you're evaluating this for the internship or building a productivity tool, Taskify API delivers a reliable, scalable, and impressive foundation.

🌟 Key Features

🔒 Secure User Authentication: JWT-based signup, login, and profile retrieval with bcrypt password hashing.
📋 Task Management: Create, read, update, and delete tasks with status tracking (pending/completed).
🔍 Pagination & Search: Efficient task listing with pagination and case-insensitive search.
🛡️ Robust Error Handling: Detailed error responses and server-side logging with timestamps and stack traces.
🛠️ Type-Safe Development: Leverages TypeScript with custom Express request types for reliability.
💾 Database Integration: Powered by Prisma ORM with MySQL by TiDB remote for seamless data management.
⚙️ Development Workflow: Nodemon for auto-restarts, Prisma migrations, and a modular codebase.
🚀 Production-Ready: Deployed on Render with environment-based configuration and secure JWT secrets.


🛠️ Technology Stack

Language: TypeScript for type-safe development
Framework: Express.js for robust API routing
ORM: Prisma with MySQL by TiDB remote for database management
Authentication: JWT and bcrypt for secure access
Development Tools: Nodemon, ts-node, TypeScript
Dependencies: cors, jsonwebtoken, prisma
Environment: Node.js 18+
Database: MySQL 8+ hosted by TiDB remote
Deployment: Render for cloud hosting


🎯 Fetan System Internship Context
Taskify API is a test submission for the Fetan System Technology Internship, showcasing professional-grade skills in:

Backend Development: Building a RESTful API with Express and TypeScript.
Database Management: Designing and managing a MySQL schema using Prisma ORM with TiDB remote.
Security Practices: Implementing JWT authentication and bcrypt password hashing.
Error Handling: Robust logging system with timestamps and stack traces for debugging.
Development Workflow: Leveraging Nodemon, Postman, and Prisma migrations for efficiency.
Cloud Deployment: Successfully deployed on Render with production-ready configuration.
Code Quality: Adhering to clean code principles, type safety, and modular architecture.

This project reflects the dedication, technical expertise, and problem-solving skills required to excel at Fetan Systems, delivering a scalable and functional solution.

🚀 Getting Started
Follow these steps to set up and run Taskify API locally.
Prerequisites

Node.js: v18+ (Download)
MySQL: v8+ (Use TiDB or local MySQL) (TiDB Cloud)
Postman: For API testing (Download)
Git: For cloning the repository (Download)

Installation

Clone the Repository:
git clone https://github.com/ispastro/taskify-api.git
cd taskify-api


Install Dependencies:
npm install


Configure Environment Variables:

Create a .env file in the root directory:
DATABASE_URL="mysql://user:password@host:port/task_manager"
JWT_SECRET="your_jwt_secret_key"



For TiDB, get DATABASE_URL from TiDB Cloud dashboard.

Use a secure JWT_SECRET (32+ characters).



Set Up Database:

Ensure MySQL or TiDB is running.

Generate Prisma client and apply migrations:
npm run prisma:generate
npm run prisma:migrate




Start the Server:

For development (with Nodemon):
npm run dev


For production:
npm run build && npm start


Access at http://localhost:8000.





📚 API Documentation
Taskify API offers a RESTful interface with JSON payloads. Task endpoints require JWT authentication via Authorization: Bearer <token>.
Authentication Endpoints



Method
Endpoint
Description
Request Body Example



POST
/api/auth/signup
Register a new user
{ "name": "John Doe", "email": "john@example.com", "password": "password123" }


POST
/api/auth/login
Log in and get JWT token
{ "email": "john@example.com", "password": "password123" }


GET
/api/auth/profile
Get authenticated user profile
None (requires Authorization header)


Task Endpoints



Method
Endpoint
Description
Request Body Example



POST
/api/tasks
Create a new task
{ "name": "Complete project report" }


GET
/api/tasks
List tasks (pagination & search)
None (query: ?page=1&limit=10&search=project)


PATCH
/api/tasks/:id
Update task status
{ "status": "completed" }


DELETE
/api/tasks/:id
Delete a task
None


Example: Create a Task
Request:
curl -X POST http://localhost:8000/api/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <jwt_token>" \
-d '{"name": "Complete project report"}'

Response:
{
  "id": 1,
  "name": "Complete project report",
  "status": "pending",
  "userId": 1,
  "createdAt": "2025-07-25T12:17:00.000Z",
  "updatedAt": "2025-07-25T12:17:00.000Z"
}

Error Responses
Errors return JSON with clear messages, logged server-side with timestamps and stack traces:
{
  "error": "Task name is required"
}


🧪 Testing with Postman

Import Collection:

Create a Postman collection named “Taskify API”.
Add requests for each endpoint (see API Documentation).


Set Up Environment:

Create a Postman environment with a token variable.
Save the token after POST /api/auth/signup or POST /api/auth/login.


Test Endpoints:

Signup/Login: Obtain a JWT token.
Tasks:
POST /api/tasks: Create tasks.
GET /api/tasks: List tasks with query parameters.
PATCH /api/tasks/:id: Update status.
DELETE /api/tasks/:id: Delete tasks.


Test error cases (e.g., invalid tokens) and check terminal logs.


Observe Terminal Logs:

Errors are logged with timestamps and stack traces:
[2025-07-25T12:17:00Z] Authentication error, Invalid token: jwt malformed
[stack trace]






🚀 Deployment on Render
Taskify API is proudly deployed on Render’s free tier with Live prieview at   https://taskify-api-qoc6.onrender.com/, integrated with MySQL by TiDB remote for robust database management. Below are the steps to replicate the deployment.
Prerequisites

Render Account: Sign up at render.com.
GitHub Repository: Push to ispastro/taskify-api.
MySQL Database: Use TiDB remote (TiDB Cloud).

Deployment Details

Platform: Render (free tier)
Database: MySQL by TiDB remote, managed via Prisma ORM
Node.js Version: 18.x for compatibility
Build Command: npm install && npm run build
Start Command: npm start
Deployment Steps


Push to GitHub:
git add .
git commit -m "Deploy to Render with TiDB"
git push origin main


Create Web Service on Render:

In Render, click “New” → “Web Service”.
Connect to ispastro/taskify-api.
Configure:
Root Directory: .

Build Command: npm install && npm run build

Start Command: npm start

Node.js Version: 23.x (via .node-version)

Environment Variables:
DATABASE_URL=mysql://<tidb_user>:<tidb_password>@<tidb_host>:<tidb_port>/taskify_db
JWT_SECRET=your_jwt_secret_key






Set Up TiDB MySQL Database:

Create a TiDB Cloud database (free tier available).

Get the DATABASE_URL from TiDB Cloud dashboard.

Apply migrations locally:
DATABASE_URL=<tidb_mysql_url> npm run prisma:migrate:deploy




Deploy:

Trigger deployment in Render.
Monitor logs for:
Successful npm install (postinstall: npx prisma generate).
Successful npx prisma generate.
Successful tsc.
Successful npm start.





Troubleshooting Deployment (Free Tier)

Error: Cannot find module '/opt/render/.../index.ts':

Cause: Render runs TypeScript directly.
Fix: Ensure "start": "node dist/index.js" in package.json and tsconfig.json has "outDir": "./dist".


Error: @prisma/client did not initialize:

Cause: Prisma client files are missing.
Fix:
Verify schema.prisma: output = "../../node_modules/.prisma/client" (adjust for src/prisma/).

Ensure package.json has "postinstall": "npx prisma generate".

Check logs for “Generated Prisma Client” in node_modules/.prisma/client.

Update CACHE_CLEAR (e.g., 5) and redeploy.

Test locally:
npm run dev -- --prod






Error: Database Connection:

Verify DATABASE_URL matches TiDB’s MySQL config.

Test locally:
DATABASE_URL=<tidb_db_url> npm start




Error: Node.js Version:

Ensure .node-version is 18 or set 18.x in Render.

Test locally:
nvm use 18
npm run build
npm start






🛠️ Development Workflow
Codebase Structure
taskify-api/
├── src/
│   ├── config/          # Database setup (e.g., Prisma client)
│   ├── controllers/     # API request/response logic
│   ├── middleware/        # Authentication, error handling
│   ├── prisma/          # MySQL schema and migrations
│   ├── routes/          # Express API routes
│   ├── types/           # TypeScript custom types
│   └── index.ts         # Server entry point
├── dist/                # Compiled JavaScript
├── .env                 # Environment variables
├── .node-version        # Node.js version (18)
├── nodemon.json         # Nodemon config
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript config
└── README.md            # Project documentation

Scripts
npm run dev           # Start with Nodemon (dev)
npm run build         # Compile TypeScript & generate Prisma client
npm start             # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Apply migrations (dev)
npm run prisma:migrate:deploy  # Apply migrations (prod)

TypeScript

Custom types in src/types/express.d.ts for req.user.
Run npx tsc --noEmit to check types.

Nodemon

Configured in nodemon.json to watch .ts files.


🔒 Security Considerations

JWT Authentication: Tokens expire in 1 hour.
Password Hashing: bcrypt with 10 salt rounds.
Environment Variables: Securely store JWT_SECRET, DATABASE_URL.
Error Handling: Hide detailed errors in production (NODE_ENV=production).
CORS: Allow all origins (*) in dev; restrict in prod.


🤝 Contributing
Contributions are welcome to enhance Taskify API for Fetan System’s evaluation:

Fork the Repository:
git clone https://github.com/ispastro/taskify-api.git


Create a Branch:
git checkout -b feature/your-feature


Make Changes:

Follow TypeScript and clean code conventions.
Add tests for new features.


Submit a Pull Request:

Include a clear description.




📄 License
Taskify API is licensed under the MIT License.

📬 Contact
For inquiries about the Fetan System internship or Taskify API:

Email: haileasaye51@gmail.com
GitHub: ispastro
Twitter: @your_twitter


🌟 Why Taskify API Stands Out?
Taskify API is a showcase of excellence for Fetan System’s Technology Internship. With its developer-friendly design, robust error handling, scalable architecture, and successful deployment on Render using MySQL by TiDB remote, it delivers a professional-grade solution. Built with precision, resilience, and modern tools, this project demonstrates readiness to drive innovation at Fetan Systems. The journey to resolve deployment challenges reflects problem-solving prowess and technical mastery.
Thank you for reviewing this project! 🚀 Let Taskify API inspire your next big idea!
