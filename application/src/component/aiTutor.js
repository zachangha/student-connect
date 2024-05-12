import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import "./styles/aiTutor.css";
import rehypeKatex from "rehype-katex";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "katex/dist/katex.min.css";
import AlertComponent from "./alerts";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  /*
   send message to gemini api and wait for response
   */
  const handleSend = async () => {
    if (input.trim()) {
      setAlert({ open: true, message: "I am thinking...", severity: "info" });

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: input }),
        });

        const data = await response.json();
        // Close the thinking alert
        setAlert({ open: false, message: "", severity: "" });

        if (response.ok) {
          setMessages(
            messages.concat(
              { text: input, isUser: true },
              { text: data.message, isUser: false },
            ),
          );
          setInput("");
        } else {
          console.error("Failed to send message:", data.message);
          setAlert({
            open: true,
            message: "Failed to send message: " + data.message,
            severity: "error",
          });
        }
      } catch (error) {
        console.error("Failed to send message:", error);
        setAlert({ open: true, message: "Network error", severity: "error" });
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  /* 
  return the tutor container that allows for user to interact with gemini api
   */
  return (
    <div className="ai-tutor-container">
      <Paper
        style={{
          position: "relative",
          height: "70vh",
          overflow: "auto",
          marginBottom: 10,
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem
              // messages will show up as a list on the page
              key={index}
              style={{
                justifyContent: message.isUser ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                primary={
                  <ReactMarkdown
                    // render latex and markdown properly for math and for equations
                    children={message.text}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  />
                }
                // change color depending on user or AI response
                style={{
                  backgroundColor: message.isUser ? "#e0f7fa" : "#eceff1",
                  padding: 10,
                  borderRadius: 10,
                }}
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <TextField
          label="Type your question here..."
          variant="outlined"
          style={{ flex: 1, marginRight: 8 }}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <Button
          variant="contained"
          style={{ height: "55px" }}
          color="primary"
          onClick={handleSend}
        >
          <ArrowUpwardIcon />
        </Button>
      </div>
      <AlertComponent
        open={alert.open}
        handleClose={() => setAlert({ ...alert, open: false })}
        severity={alert.severity}
        message={alert.message}
      />
    </div>
  );
}

export default App;
