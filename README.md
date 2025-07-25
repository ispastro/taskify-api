Taskify API: A Task Management Backend for Fetan System's Internship
 
Taskify API is a modern, scalable, and secure RESTful API developed as part of the Fetan System's Technology Internship Test Project. Built with TypeScript, Express, and Prisma, this backend powers efficient task management with user authentication, task CRUD operations, pagination, and search functionality. Designed to demonstrate technical proficiency and real-world application development skills, Taskify API offers a production-ready architecture with robust error handling, detailed logging, and a developer-friendly workflow.
Crafted to meet the high standards of Fetan System’s internship evaluation, this project showcases expertise in backend development, API design, and database management. Whether you're building a productivity app, a team collaboration tool, or evaluating this for internship purposes, Taskify API delivers a reliable and impressive foundation.

🌟 Features

User Authentication: Secure JWT-based signup, login, and profile retrieval with bcrypt password hashing.
Task Management: Create, read, update, and delete tasks with status tracking (pending/completed).
Pagination & Search: Efficient task listing with pagination and case-insensitive search capabilities.
Robust Error Handling: Detailed error responses and server-side logging with timestamps and stack traces for debugging.
Type-Safe Development: Leverages TypeScript with custom Express request types for enhanced reliability.
Database Integration: Powered by Prisma ORM with MySQL for seamless data management.
Development Workflow: Nodemon for auto-restarts, Prisma migrations, and a well-organized codebase.
Production-Ready: Environment-based configuration, secure JWT secrets, and global error middleware.


🛠️ Tech Stack

Language: TypeScript
Framework: Express.js
ORM: Prisma with MySQL
Authentication: JSON Web Tokens (JWT), bcrypt
Development Tools: Nodemon, ts-node, TypeScript
Dependencies: cors, jsonwebtoken
Environment: Node.js 18+
Database: MySQL 8+


🎯 Fetan System Internship Context
This project was developed as a test submission for the Fetan System Technology Internship, demonstrating proficiency in:

Backend Development: Building a RESTful API with Express and TypeScript.
Database Management: Designing and implementing a MySQL database schema using Prisma.
Security Practices: Implementing JWT authentication and password hashing.
Error Handling: Creating a robust error logging system visible in the terminal for debugging.
Development Workflow: Utilizing modern tools like Nodemon and Postman for efficient development and testing.
Code Quality: Adhering to clean code principles, type safety, and modular architecture.

The Taskify API reflects the skills and dedication required to excel in a professional technology internship, showcasing a solution that is both functional and scalable.

🚀 Getting Started
Follow these steps to set up and run Taskify API locally.
Prerequisites

Node.js: v18 or higher (Download)
MySQL: v8 or higher (Download)
Postman: For API testing (Download)
Git: For cloning the repository (Download)

Installation

Clone the Repository:
git clone https://github.com/your-username/taskify-api.git
cd taskify-api


Install Dependencies:
npm install


Configure Environment Variables:

Create a .env file in the root directory:DATABASE_URL="mysql://user:password@localhost:3306/task_manager"
JWT_SECRET="your_jwt_secret_key"
PORT=3000
NODE_ENV=development


Replace user, password, and task_manager with your MySQL credentials.
Use a secure JWT_SECRET (e.g., a 32-character random string).


Set Up Database:

Ensure MySQL is running.
Generate Prisma client and apply migrations:npm run prisma:generate
npm run prisma:migrate




Start the Server:

For development (with auto-restarts via Nodemon):npm run dev


For production:npm start


The server will run on http://localhost:3000.




📚 API Documentation
Taskify API provides a RESTful interface with JSON request/response payloads. All task-related endpoints require authentication via a JWT token in the Authorization: Bearer <token> header.
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
List tasks (with pagination)
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
curl -X POST http://localhost:3000/api/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <jwt_token>" \
-d '{"name": "Complete project report"}'

Response:
{
  "id": 1,
  "name": "Complete project report",
  "status": "pending",
  "userId": 1,
  "createdAt": "2025-07-25T03:36:00.000Z",
  "updatedAt": "2025-07-25T03:36:00.000Z"
}

Error Responses
Errors return JSON with detailed messages and are logged server-side with timestamps and stack traces:
{
  "error": "Task name is required"
}


🧪 Testing with Postman

Import Collection:

Create a Postman collection named “Taskify API”.
Add requests for each endpoint (see API Documentation).


Set Up Environment:

Create a Postman environment with a token variable.
After POST /api/auth/signup or POST /api/auth/login, save the token value.


Test Endpoints:

Signup/Login: Obtain a JWT token.
Tasks:
POST /api/tasks: Create tasks.
GET /api/tasks: List tasks with query parameters.
PATCH /api/tasks/:id: Update task status.
DELETE /api/tasks/:id: Delete tasks.


Verify error cases (e.g., missing fields, invalid tokens) and check terminal logs.


Observe Terminal Logs:

Errors (e.g., Invalid token, Task not found) are logged with timestamps and stack traces:[2025-07-25T07:02:00.000Z] Authentication error: jwt malformed
[stack trace]






🛠️ Development Workflow

Codebase Structure:
taskify-api/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication and error handling
│   ├── prisma/          # Prisma schema and migrations
│   ├── routes/          # Express routes
│   ├── types/           # Custom TypeScript types
│   └── index.ts         # Server entry point
├── .env                 # Environment variables
├── nodemon.json         # Nodemon configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation


Scripts:
npm run dev           # Start server with Nodemon
npm start             # Start server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Apply database migrations


TypeScript:

Custom types in src/types/express.d.ts extend Express Request for req.user.
Run npx tsc --noEmit to check type errors.


Nodemon:

Configured via nodemon.json to watch .ts files in src and restart on changes.




🔒 Security Considerations

JWT Authentication: Tokens expire in 1 hour for enhanced security.
Password Hashing: Uses bcrypt with 10 salt rounds.
Environment Variables: Sensitive data (e.g., JWT_SECRET, DATABASE_URL) is stored in .env.
Error Handling: Detailed error messages are hidden in production (NODE_ENV=production).
CORS: Configured to allow all origins (*) in development; restrict in production.


🚀 Deployment
To deploy Taskify API to a production environment (e.g., Heroku, AWS, Render):

Set Environment Variables:

Configure DATABASE_URL, JWT_SECRET, PORT, and NODE_ENV=production on the hosting platform.


Build the Project:
npx tsc


Outputs JavaScript to dist/.


Start the Server:
node dist/index.js


Database:

Use a managed MySQL service (e.g., AWS RDS, PlanetScale).
Apply migrations:npm run prisma:migrate




Monitoring:

Integrate logging services (e.g., Winston, Loggly) for production logs.
Monitor API uptime and performance.




🤝 Contributing
Contributions are welcome to enhance Taskify API, especially for Fetan System’s internship evaluation. To contribute:

Fork the Repository:
git clone https://github.com/your-username/taskify-api.git


Create a Branch:
git checkout -b feature/your-feature


Make Changes:

Follow the codebase structure and TypeScript conventions.
Add tests for new features.


Submit a Pull Request:

Include a clear description of changes and their purpose.




📄 License
Taskify API is licensed under the MIT License. Feel free to use, modify, and distribute the code as needed.

📬 Contact
For questions, feedback, or inquiries related to the Fetan System internship or the Taskify API, reach out to:

Email: haileasaye51@gmail.com
GitHub: https://github.com/ispastro



🌟 Why Taskify API?
Taskify API is more than a test project—it’s a testament to the skills and passion required to excel in Fetan System’s Technology Internship. With its developer-friendly design, robust error handling, and scalable architecture, Taskify delivers a professional-grade solution that meets real-world needs. Built with care and precision, this project demonstrates readiness to contribute to innovative technology solutions at Fetan Systems.
Thank you for reviewing this project! 🚀
