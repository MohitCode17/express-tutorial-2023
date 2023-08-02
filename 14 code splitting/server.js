import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { config } from "dotenv";
import { dbConnection } from "./db/dbConnection.js";

const app = express();
const port = process.env.PORT || 8000;

config({
  path: "./config/config.env"
})

// Middlewares
app.use(express.json());

// Database connection
dbConnection();

// Using routes
app.use("/api/v2", userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
