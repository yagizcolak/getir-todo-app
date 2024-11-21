
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

(Already included in GitHub for the sake of this project, this wouldn't be the case in real life)
```
PORT=5000
MONGODB_URI=mongodb+srv://admin:admin@cluster0.iednc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

#### **- Frontend Dependencies**

Navigate to the frontend directory and install its dependencies:
```
cd frontend
npm install
```

Set Up Environment Variables (.env.development)

(Already included in GitHub for the sake of this project, this wouldn't be the case in real life)
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

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

• The backend server will start on [http://localhost:3000](http://localhost:3000).
  

**Note:** Make sure ports 3000 and 5000 are available on your machine.

<br/>

### **4. Access the Application**

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

<br/>

### **5. Deployment**

The application is deployed and accessible at:

•  *Frontend URL:* [https://getir-todo-frontend.onrender.com](https://getir-todo-frontend.onrender.com)

•  *Backend URL:* [https://getir-todo-backend.onrender.com/api/tasks](https://getir-todo-backend.onrender.com/api/tasks)

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
