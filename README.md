
# Welcome to Getir To-Do App!

  

A simple and responsive to-do web application that allows users to manage their tasks effectively. Users can add, view, edit, and delete tasks, as well as filter them based on various criteria.

  

  

# **Prerequisites**

  

• **Node.js** (version 14 or higher recommended

• **npm** (comes with Node.js)

  
  

## **Getting Started**
### **1. Clone the Repository**

```
git clone https://github.com/yagizcolak/getir-todo-app.git
```

  

### **2. Install Dependencies**

#### **- Backend Dependencies**
Navigate to the backend directory and install its dependencies:
```
cd backend
npm install
```

Set Up Environment Variables (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://admin:admin@cluster0.iednc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```
Note: In a real-world application, .env files should not be pushed to GitHub. For the sake of this project, they are included to simplify setup.

#### **- Frontend Dependencies**

Navigate to the frontend directory and install its dependencies:
```
cd frontend
npm install
```

Set Up Environment Variables (.env.development)

```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```
Note: In a real-world application, .env files should not be pushed to GitHub. For the sake of this project, they are included to simplify setup.

<br/>

### **3. Running the Application**

#### Running the Backend:

Inside the backend directory:
```
npm run dev
```



• The backend server will start on [http://localhost:5000](http://localhost:5000).

#### Running the Frontend:

Inside the frontend directory:
```
npm start
```

• The frontend server will start on [http://localhost:3000](http://localhost:3000).
  

**Note:** Make sure ports 3000 and 5000 are available on your machine.

<br/>

### **4. Access the Application**

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

The frontend is configured to communicate with the backend at http://localhost:5000/api. Ensure both the frontend and backend are running.

<br/>

### **5. Deployment**

The application is deployed and accessible at:

•  *Frontend URL:* [https://getir-todo-frontend.onrender.com](https://getir-todo-frontend.onrender.com)

•  *Backend URL:* [https://getir-todo-backend.onrender.com/api/tasks](https://getir-todo-backend.onrender.com/api/tasks)

<br/>

Features

	•	Add new tasks with details like title, category, status, and deadline.
	•	View a list of all tasks with options to edit or delete.
	•	Filter tasks based on keyword, category, and status.
	•	Responsive design for optimal viewing on various devices.
	•	Notifications for success and error messages.
	•	Unit tests to ensure component reliability.
	•	End-to-end testing with Cypress.

<br/>

## **Project Structure**

```
.
├── README.md
├── backend
│   ├── app.ts
│   ├── models
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   └── tsconfig.json
└── frontend
    ├── build
    ├── cypress
    ├── cypress.config.ts
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── src
    └── tsconfig.json
```

  

• frontend/: Contains the React frontend source code.

  

• backend/: Contains the backend server code.
