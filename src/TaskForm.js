import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(task);  // Call the onAddTask function passed as props
    setTask({ title: "", description: "", completed: false, dueDate: "" });  // Reset the form
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        value={task.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={task.description}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Due Date"
        name="dueDate"
        type="date"
        value={task.dueDate}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
