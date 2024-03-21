import path from "path";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { connectToDatabase } from "./database.mjs";

const app = express(); // create express app

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = path.resolve(__dirname, "..", "build");
app.use(express.static(root));

connectToDatabase();

app.use("/*", (req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port " + (process.env.PORT || 3000));
});
