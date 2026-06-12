import express from "express";
import cors from "cors";
import pool from './db.js';

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors(
    {origin: "http://localhost:5173"}
));
// Connect when server starts
(async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release(); // return connection to pool
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();


app.get("/", async (req, res) => {

    //fetch the data
    const result = await pool.query("select * from tasks");
    return res.status(200).json(result.rows);
});
app.get("/task/:id", async (req, res) => {
    const {id}=req.params;
    //fetch the data
    const result = await pool.query("select * from tasks where id=$1",[id]);
    return res.status(200).json(result.rows);
});


app.post("/create", async (req, res) => {

    const { task_name, task_description } = req.body;

    const result = await pool.query(
        "INSERT INTO tasks(title, description) VALUES($1, $2)",
        [task_name, task_description]);

    if (result.rowCount < 1) {
        return res.status(500).json({ message: "record is not created successful" })
    }

    const data = await pool.query("select * from tasks");
    return res.status(201).json({ message: "task created successfully", data: data.rows });
})


app.put("/update/:id", async (req, res) => {
    const {id}=req.params;
    const {  title,description } = req.body;

    console.log("the data from frontend:"+id, title, description);
    const result = await pool.query(
  "UPDATE tasks SET title = $1, description = $2 WHERE id = $3",
  [title, description, id]
);

    if (result.rowCount < 1) {
        return res.status(404).json({ message: "task is not found" });
    }
    return res.status(200).json({ message: "task updated successfully" });
});


app.delete("/delete",async (req, res)=>{
    const {task_id}=req.body;
    const result=await pool.query("DELETE FROM tasks WHERE id=$1",[task_id]);
    if (result.rowCount<1){
        return res.status(404).json({message:"task is not found"});
    }
    return res.status(200).json({message:"task deleted successfully"});
})

app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
})