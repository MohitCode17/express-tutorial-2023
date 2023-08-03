import express from "express"
import { config } from "dotenv";
import { dbConnect } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js"
import cookieParser from "cookie-parser";
const app = express();

config({
    path: "./config/config.env",
});

// MongoDB Connection Function
dbConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routers
app.use("/api/v1/users", userRouter);
app.use('/api/v1/task', taskRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});