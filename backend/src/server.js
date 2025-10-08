import express from "express";
import notesRoute from "./routes/notesRoute.js";
import { testConnection } from "./config/db.js";
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/", notesRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  testConnection();
});
