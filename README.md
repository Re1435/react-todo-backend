Here's an example of a `README.md` file for your backend code that demonstrates the project:

````markdown
# To-Do List Application Backend

This repository contains the backend code for a simple To-Do list application built with Node.js, Express, and MongoDB. The backend provides a RESTful API to manage tasks, including adding new tasks, marking tasks as completed, deleting tasks, and downloading a list of tasks as a PDF file.

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Fetch all tasks
- Download tasks as a PDF file

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- jsPDF
- Axios

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Re1435/react-todo-backend
```
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB URI and other environment variables:

```env
MONGO_URI=your_mongo_db_uri
PORT=3001
```

4. Create the necessary directories:

```bash
mkdir uploads
```

### Running the Server

Start the server with:

```bash
npm start
```

The server will run on `http://localhost:3001`.

### API Endpoints

- `GET /tasks/get-tasks` - Fetch all tasks
- `POST /tasks/add-task` - Add a new task
- `PUT /tasks/update-taskStatus/:id` - Update the status of a task
- `DELETE /tasks/delete-task/:id` - Delete a task
- `POST /upload` - Upload a PDF file

### Example Requests

- **Fetch all tasks**

```bash
curl -X GET http://localhost:3001/tasks/get-tasks
```

- **Add a new task**

```bash
curl -X POST http://localhost:3001/tasks/add-task -H "Content-Type: application/json" -d '{"text": "New Task"}'
```

- **Update task status**

```bash
curl -X PUT http://localhost:3001/tasks/update-taskStatus/{taskId} -H "Content-Type: application/json" -d '{"status": true}'
```

- **Delete a task**

```bash
curl -X DELETE http://localhost:3001/tasks/delete-task/{taskId}
```

- **Upload a PDF**

```bash
curl -X POST http://localhost:3001/upload -F "file=@path/to/your/todo-list.pdf"
```

### Project Structure

```
.
├── routers
│   ├── taskRoutes.js
├── uploads
├── .env
├── .gitignore
├── package.json
├── server.js
```

- `routers/taskRoutes.js` - Contains route definitions for task-related operations.
- `uploads/` - Directory to store uploaded PDF files.
- `.env` - Environment variables.
- `server.js` - Main server file.

### Deployment

To deploy this backend application, you can use any cloud service provider such as AWS, Heroku, DigitalOcean, etc. Ensure you have set up environment variables correctly and configured MongoDB access for the production environment.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
