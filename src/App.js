import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Sidebar from "./Sidebar";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Analytics from "./Analytics";
import SignUp from "./SignUp";
import axios from "axios";
import './style.css';

const App = () => {
  const [tasks, setTasks] = useState([]);  // Manages the tasks

  // Fetch tasks on component mount
  useEffect(() => {
    axios.get("http://localhost:3500/tasks").then((response) => {
      setTasks(response.data);  // Set the tasks fetched from JSON server
    });
  }, []);

  // Function to add new task
  const addTask = async (newTask) => {
    const response = await axios.post("http://localhost:3500/tasks", newTask);
    setTasks([...tasks, response.data]);  // Update tasks state with the new task
  };

  // Function to delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3500/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));  // Remove deleted task from the list
  };

  // Function to toggle task completion
  const toggleCompleted = async (id) => {
    const task = tasks.find((task) => task.id === id);
    const updatedTask = { ...task, completed: !task.completed };
    await axios.put(`http://localhost:3500/tasks/${id}`, updatedTask);
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));  // Update the task status
  };

  // Filter tasks based on status
  const filterTasks = (status) => {
    switch (status) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      case "overdue":
        return tasks.filter((task) => new Date(task.dueDate) < new Date());
      default:
        return tasks;
    }
  };

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Sidebar />  {/* Sidebar component */}
        <Container sx={{ marginLeft: "250px", padding: "20px", flexGrow: 1 }}>
          <Routes>
            {/* Dashboard or Home */}
            <Route 
              path="/home" 
              element={
                <Box
                  sx={{
                    backgroundImage: 'url("/student-background.jpg")', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <h2 style={{ color: "#301934", fontSize: "3rem" }}>Welcome to Student Task Dashboard</h2>
                </Box>
              } 
            />

            {/* SignUp page */}
            <Route path="/signup" element={<SignUp />} />

            {/* To-Do List Page with Add task, all tasks, etc */}
            <Route path="/todo" element={<TaskList tasks={tasks} onDelete={deleteTask} onToggleCompleted={toggleCompleted} />} />
            
            {/* Add Task Page */}
            <Route
              path="/todo/add-task"
              element={
                <div>
                  <Box sx={{ paddingLeft: "50px" }}>  {/* Added padding to left for space */}
                    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add the tasks here...</h1>
                    <TaskForm onAddTask={addTask} />
                  </Box>
                </div>
              }
            />

            {/* All Tasks */}
            <Route
              path="/todo/all-tasks"
              element={
                <div>
                  <h1 style={{ textAlign: "center", marginBottom: "20px" }}>All Tasks</h1>
                  <TaskList
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggleCompleted={toggleCompleted}
                  />
                </div>
              }
            />

            {/* Completed Tasks */}
            <Route
              path="/todo/completed-tasks"
              element={
                <div>
                  <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Completed Tasks</h1>
                  <TaskList tasks={filterTasks("completed")} onDelete={deleteTask} onToggleCompleted={toggleCompleted} />
                </div>
              }
            />

            {/* Pending Tasks */}
            <Route
              path="/todo/pending-tasks"
              element={
                <div>
                  <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Pending Tasks</h1>
                  <TaskList tasks={filterTasks("pending")} onDelete={deleteTask} onToggleCompleted={toggleCompleted} />
                </div>
              }
            />

            {/* Overdue Tasks */}
            <Route
              path="/todo/overdue-tasks"
              element={
                <div>
                  <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                    {filterTasks("overdue").length > 0 ? "Overdue Tasks" : "There are no Overdue Tasks"}
                  </h1>
                  <TaskList tasks={filterTasks("overdue")} onDelete={deleteTask} onToggleCompleted={toggleCompleted} />
                </div>
              }
            />

            {/* Analytics Routes */}
            <Route path="/analytics/task-stats" element={<Analytics tasks={tasks} />} />
            <Route path="/analytics/task-pie-chart" element={<Analytics tasks={tasks} showPieChart={true} />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
