import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles/homePage.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.id) {
      // Ensure there's a user and user.id is not undefined
      fetchTasks();
    }
  }, [user.id]); // Dependency array with user.id

  // list users tasks that have already been saved in the DB
  const fetchTasks = async () => {
    if (user.id) {
      const response = await axios.get(`/api/tasks/${user.id}`);
      const formattedTasks = response.data.map((task) => ({
        id: task._id,
        text: task.task,
        checked: task.completed,
      }));
      setTasks(formattedTasks);
    }
  };

  // add tasks to the database
  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      const response = await axios.post("/api/tasks", {
        task: newTask,
        authorId: user.id,
      });
      const newTaskFromResponse = {
        id: response.data.newTask._id,
        text: response.data.newTask.task,
        checked: response.data.newTask.completed,
      };
      setTasks([...tasks, newTaskFromResponse]);
      setNewTask("");
    }
  };

  // checkmarks
  const handleToggleCheck = async (id, checked) => {
    const response = await axios.put(`/api/tasks/${id}`, {
      completed: !checked,
    });
    if (response.status === 200) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, checked: !task.checked } : task,
        ),
      );
    }
  };

  // delete tasks from database
  const handleDeleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks(); // Re-fetch tasks to update the list
  };

  return (
    <div className="root">
      <Typography
        variant="h6"
        style={{
          marginBottom: "16px",
          textAlign: "center",
          style: "bold",
          fontSize: "1.5rem",
        }}
      >
        Welcome, {user.username || "User"}!
      </Typography>

      <Container className="todoContainer">
        <TextField
          variant="outlined"
          label="Add New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          disabled={!newTask.trim()}
          fullWidth
        >
          Add Task
        </Button>
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              dense
              button
              onClick={() => handleToggleCheck(task.id, task.checked)}
            >
              <Checkbox
                edge="start"
                checked={task.checked}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText
                primary={task.text}
                primaryTypographyProps={{ style: { fontSize: "1.5rem" } }} // Adjust font size as needed
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default App;
