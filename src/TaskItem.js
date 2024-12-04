import React from "react";
import { Box, Button, Checkbox, Typography } from "@mui/material";

const TaskItem = ({ task, onDelete, onToggleCompleted }) => {
  return (
    <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Typography variant="h6">{task.title}</Typography>
        <Typography>{task.description}</Typography>
        <Typography>Due Date: {task.dueDate}</Typography>
      </Box>
      <Box>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggleCompleted(task.id)}
          inputProps={{ "aria-label": "task completion checkbox" }}
        />
        <Button onClick={() => onDelete(task.id)} variant="contained" color="secondary">
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default TaskItem;
