import React, { useState } from "react";
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

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const today = new Date();
  const dateString = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`; // Format: DD/MM/YYYY

  // add tasks to list
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, checked: false }]);
      setNewTask("");
    }
  };

  // checkmarks
  const handleToggleCheck = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, checked: !task.checked };
        }
        return task;
      })
    );
  };

  // delete tasks from list
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // return a todo list
  return (
    <div className="root">
      <Typography
        variant="h6"
        style={{ marginBottom: "16px", textAlign: "center", style: "bold" }}
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
              onClick={() => handleToggleCheck(task.id)}
            >
              <Checkbox
                edge="start"
                checked={task.checked}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={task.text} />
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
