import React from "react";
import { Button, List, ListItem, ListItemText, Checkbox } from "@mui/material";

const TaskList = ({ tasks, onDelete, onToggleCompleted }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleCompleted(task.id)}  // Toggle completion status
          />
          <ListItemText primary={task.title} secondary={task.description} />
          <Button onClick={() => onDelete(task.id)} variant="outlined" color="secondary">
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
