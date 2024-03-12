import path from "path";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const app = express(); // create express app

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = path.resolve(__dirname, "..", "build");
app.use(express.static(root));

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", function () {
  console.log("MongoDB connection successfully established");
});

app.get("/members/:memberName", (req, res) => {
  const memberName = req.params.memberName;
  console.log(`Member requested: ${memberName}`);
  res.sendFile(path.join(root, "index.html"));
});

app.use("/*", (req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port " + (process.env.PORT || 3000));
});
