import path from "path";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express(); // create express app
app.use(cors());

app.use(bodyParser.json());

// add middlewares
const root = path.join(process.cwd(), "build");
app.use(express.static(root));

app.use("/*", (req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

// start express server on port 5000
app.listen(process.env.PORT || 5001, () => {
  console.log("server started");
});
