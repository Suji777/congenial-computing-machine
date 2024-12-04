import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const [open, setOpen] = useState(false); // Handles the dropdown menu
  const [sidebarOpen, setSidebarOpen] = useState(false); // Handles the visibility of the sidebar

  const handleDropdownClick = () => {
    setOpen(!open);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    if (window.innerWidth <= 600) {
      setSidebarOpen(false); // Automatically hide sidebar for mobile
    }
  };

  return (
    <>
      {/* Hamburger menu icon */}
      <MenuIcon
        onClick={toggleSidebar}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          fontSize: "2rem",
          color: sidebarOpen ? "#FFFFFF" : "#301934",
          cursor: "pointer",
          zIndex: 1000,
        }}
      />

      {/* Sidebar */}
      {sidebarOpen && (
        <Box
          sx={{
            width: 250,
            backgroundColor: "#301934",
            height: "100vh",
            padding: 2,
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
          }}
        >
          <h2 style={{ color: "white" }}>Task Management</h2>
          <List>
            <ListItem button component={Link} to="/home" onClick={handleCloseSidebar}>
              <ListItemText primary="Home" style={{ color: "white" }} />
            </ListItem>

            <ListItem button component={Link} to="/signup" onClick={handleCloseSidebar}>
              <ListItemText primary="Sign Up" style={{ color: "white" }} />
            </ListItem>

            <ListItem button onClick={handleDropdownClick}>
              <ListItemText primary="Tasks" style={{ color: "white" }} />
              {open ? <ExpandLessIcon style={{ color: "white" }} /> : <ExpandMoreIcon style={{ color: "white" }} />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/todo/all-tasks" onClick={handleCloseSidebar}>
                  <ListItemText primary="All Tasks" style={{ color: "white", paddingLeft: 30 }} />
                </ListItem>
                <ListItem button component={Link} to="/todo/add-task" onClick={handleCloseSidebar}>
                  <ListItemText primary="Add Task" style={{ color: "white", paddingLeft: 30 }} />
                </ListItem>
                <ListItem button component={Link} to="/todo/completed-tasks" onClick={handleCloseSidebar}>
                  <ListItemText primary="Completed Tasks" style={{ color: "white", paddingLeft: 30 }} />
                </ListItem>
                <ListItem button component={Link} to="/todo/pending-tasks" onClick={handleCloseSidebar}>
                  <ListItemText primary="Pending Tasks" style={{ color: "white", paddingLeft: 30 }} />
                </ListItem>
                <ListItem button component={Link} to="/todo/overdue-tasks" onClick={handleCloseSidebar}>
                  <ListItemText primary="Overdue Tasks" style={{ color: "white", paddingLeft: 30 }} />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button component={Link} to="/analytics/task-stats" onClick={handleCloseSidebar}>
              <ListItemText primary="Analytics" style={{ color: "white" }} />
            </ListItem>
          </List>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
