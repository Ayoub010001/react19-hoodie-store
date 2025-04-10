# Final Project: Task Management Application

## Overview

For your final project, you will build a simplified task management application called "TaskHub" that allows users to create, organize, and track tasks across different projects. This application will help you demonstrate your understanding of React fundamentals, component structure, routing, and state management. You'll also implement a polished UI using Tailwind CSS.

## Requirements

### Core Features

1. **Dashboard**

   - Summary of tasks (total, completed, in progress)
   - List of projects

2. **Projects Management**

   - List all projects
   - Create new projects
   - Delete projects

3. **Task Management**

   - List tasks within a project
   - Create new tasks with title, description, status, and priority
   - Change task status (To Do, In Progress, Completed)
   - Delete tasks
   - Filter tasks by status

4. **Responsive Design**
   - The application should be usable on both desktop and mobile devices
   - Implement a responsive layout using Tailwind CSS utility classes

### Technical Requirements

1. **Component Structure**

   - Create reusable components for common UI elements (buttons, cards)
   - Implement proper component hierarchy

2. **Routing**

   - Implement routing using React Router with the following routes:
     - `/` - Dashboard with projects summary
     - `/projects` - Projects list
     - `/projects/:projectId` - Project details with tasks

3. **State Management**

   - Use Redux Toolkit for projects and tasks state management
   - Create appropriate slices, reducers, and actions

4. **Data Fetching**

   - Use `useEffect` to fetch data from the json-server API
   - Implement loading and error states for API calls

5. **Styling with Tailwind CSS**
   - Use Tailwind utility classes for all styling needs
   - Implement a consistent color scheme and component styling
   - Create responsive layouts that work on mobile and desktop

## JSON Server Data Structure

Create a simplified `db.json` file with the following structure to use with json-server:

```json
{
  "projects": [
    {
      "id": 1,
      "name": "Website Redesign",
      "description": "Redesign the company website with modern UI",
      "createdAt": "2023-05-15T10:00:00Z"
    },
    {
      "id": 2,
      "name": "Mobile App Development",
      "description": "Develop a mobile app for iOS and Android",
      "createdAt": "2023-06-01T09:15:00Z"
    },
    {
      "id": 3,
      "name": "Marketing Campaign",
      "description": "Q3 Marketing campaign planning and execution",
      "createdAt": "2023-06-20T08:00:00Z"
    }
  ],
  "tasks": [
    {
      "id": 1,
      "projectId": 1,
      "title": "Design homepage mockup",
      "description": "Create a mockup for the new homepage design",
      "status": "completed",
      "priority": "high",
      "createdAt": "2023-05-15T10:30:00Z"
    },
    {
      "id": 2,
      "projectId": 1,
      "title": "Implement responsive navbar",
      "description": "Create a responsive navigation bar for the website",
      "status": "in_progress",
      "priority": "medium",
      "createdAt": "2023-05-20T14:30:00Z"
    },
    {
      "id": 3,
      "projectId": 2,
      "title": "Design app wireframes",
      "description": "Create wireframes for all app screens",
      "status": "to_do",
      "priority": "high",
      "createdAt": "2023-06-01T09:30:00Z"
    },
    {
      "id": 4,
      "projectId": 2,
      "title": "Research API integration options",
      "description": "Research and document API integration options for the app",
      "status": "completed",
      "priority": "medium",
      "createdAt": "2023-06-02T10:00:00Z"
    },
    {
      "id": 5,
      "projectId": 3,
      "title": "Brainstorm campaign ideas",
      "description": "Organize a brainstorming session for campaign ideas",
      "status": "to_do",
      "priority": "high",
      "createdAt": "2023-06-20T08:30:00Z"
    }
  ]
}
```

## Getting Started

1. Install json-server:

   ```bash
   npm install -g json-server
   ```

2. Create a `db.json` file with the provided structure.

3. Start the json-server:

   ```bash
   json-server --watch db.json --port 3001
   ```

4. Create a new React application using Vite:

   ```bash
   npm create vite@latest taskhub -- --template react-ts
   cd taskhub
   npm install
   ```

5. Install necessary dependencies:

   ```bash
   npm install react-router-dom @reduxjs/toolkit react-redux tailwindcss lucide-react
   ```

6. Set up Tailwind CSS:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

7. Configure Tailwind CSS:

   - Update the `tailwind.config.js` file:

   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

   - Add Tailwind directives to your `src/index.css`:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

8. Start implementing the application based on the requirements.

## API Routes

The json-server will provide the following API endpoints:

- `GET /projects` - Get all projects
- `GET /projects/:id` - Get a specific project
- `POST /projects` - Create a new project
- `DELETE /projects/:id` - Delete a project
- `GET /tasks` - Get all tasks
- `GET /tasks?projectId=1` - Get tasks for a specific project
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task's status
- `DELETE /tasks/:id` - Delete a task

## Step-by-Step Implementation Guide

To help you complete this project in 1-2 days, follow this suggested implementation order:

### Day 1:

1. **Project Setup**

   - Create the React application with Vite
   - Set up Tailwind CSS (follow the steps in "Getting Started")
   - Configure routes with React Router
   - Create a basic layout using Tailwind classes:
     ```tsx
     // Example layout with Tailwind CSS
     const Layout = ({ children }) => (
       <div className="min-h-screen bg-gray-50">
         <header className="bg-white shadow-sm py-4">
           <div className="container mx-auto px-4">
             <h1 className="text-xl font-bold text-blue-600">TaskHub</h1>
             {/* Navigation */}
           </div>
         </header>
         <main className="container mx-auto px-4 py-8">{children}</main>
       </div>
     );
     ```

2. **Redux Setup**

   - Create the Redux store
   - Implement project slice
   - Implement task slice
   - Connect the store to your application

3. **Project List Page**
   - Fetch and display projects
   - Create a responsive grid layout with Tailwind:
     ```tsx
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {projects.map((project) => (
         <div
           key={project.id}
           className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
         >
           {/* Project card content */}
         </div>
       ))}
     </div>
     ```
   - Implement creating a new project with a Tailwind-styled form
   - Add project deletion with confirmation

### Day 2:

4. **Project Details Page**

   - Display project information in a well-designed header
   - Create a status filter using Tailwind-styled tabs:
     ```tsx
     <div className="flex space-x-2 mb-4 border-b">
       <button
         className={`py-2 px-4 ${
           status === "all"
             ? "border-b-2 border-blue-500 text-blue-600"
             : "text-gray-500"
         }`}
         onClick={() => setStatus("all")}
       >
         All
       </button>
       {/* Other status buttons */}
     </div>
     ```
   - Fetch and display tasks for the selected project
   - Use Tailwind to style task cards with status indicators:
     ```tsx
     <div className="p-4 bg-white rounded-lg shadow mb-3">
       <div className="flex justify-between items-start">
         <h3 className="font-medium">{task.title}</h3>
         <span
           className={`text-xs px-2 py-1 rounded-full ${
             task.status === "completed"
               ? "bg-green-100 text-green-800"
               : task.status === "in_progress"
               ? "bg-yellow-100 text-yellow-800"
               : "bg-gray-100 text-gray-800"
           }`}
         >
           {task.status === "in_progress" ? "In Progress" : task.status}
         </span>
       </div>
       {/* Rest of task card */}
     </div>
     ```
   - Implement task filtering by status

5. **Task Management**

   - Create a form to add new tasks with Tailwind styling
   - Implement status updates for tasks with a dropdown
   - Add task deletion with a confirmation modal styled with Tailwind

6. **Dashboard**

   - Create a simple dashboard with project summary
   - Use Tailwind to create stat cards:
     ```tsx
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
       <div className="bg-white p-4 rounded-lg shadow">
         <h3 className="text-sm text-gray-500 uppercase">Total Tasks</h3>
         <p className="text-2xl font-bold">{totalTasks}</p>
       </div>
       {/* Other stat cards */}
     </div>
     ```
   - Add task statistics (total, by status)

7. **Responsive Design & Final Touches**
   - Ensure the application is responsive using Tailwind's responsive modifiers
   - Add loading states with Tailwind spinners
   - Improve error handling with alert components
   - Polish the UI with consistent spacing, typography, and colors

## Bonus Features (If Time Permits)

If you complete the core requirements and have extra time:

1. **Task Priorities** - Add visual indicators for task priorities using Tailwind's color utilities
2. **Sort Tasks** - Allow sorting tasks by creation date or priority with a styled dropdown
3. **Project Colors** - Add color labels for projects using Tailwind's background color utilities
4. **Local Storage** - Persist application state to localStorage
5. **Simple Search** - Add a search function for tasks with a styled input