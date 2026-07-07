import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";
import ConnectDB from "./config/db.js";
import  authorize  from "./middleware/authorize.js";
import verifyToken from "./middleware/verifyToken.js";
import validate from "./middleware/validate.js"
import { createTaskSchema } from "./schema-zod/task.schema.js";
const res = dotenv.config();
ConnectDB();
// console.log(res, process.env.MONGO);

const app = express();
app.use(cors(
    { origin: "http://localhost:5173" }
));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",verifyToken, taskRoutes);
app.use("/auth", authRoutes);
app.use("/admin",authorize("admin"),adminRoutes)

app.get("/test-cookie",verifyToken,(req,res)=>{
    return res.send("The response I got successfully");
})

app.listen(process.env.PORT, () => {
    console.log(`the server is running on port ${process.env.PORT}`);
})