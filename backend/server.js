import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import ConnectDB from "./config/db.js";
import verifyToken from "./middleware/verifyToken.js";
const res = dotenv.config();
ConnectDB();
// console.log(res, process.env.MONGO);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    { origin: "http://localhost:5173" }
));
app.use("/api/v1",verifyToken, taskRoutes);
app.use("/auth",verifyToken, authRoutes);

app.get("/test-cookie",verifyToken,(req,res)=>{
    return res.send("The response I got successfully");
})

app.listen(process.env.PORT, () => {
    console.log(`the server is running on port ${process.env.PORT}`);
})