import express from "express";
import User from "../models/User.js"
const router = express.Router();

router.get("/", async (req, res) => {

    //fetch the data
    const result = await pool.query("select * from tasks");
    return res.status(200).json(result.rows);
});



router.get("/task/:id", async (req, res) => {
    const { id } = req.params;
    //fetch the data
    const result = await pool.query("select * from tasks where id=$1", [id]);
    return res.status(200).json(result.rows);
});


router.post("/create", async (req, res) => {

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


router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    console.log("the data from frontend:" + id, title, description);
    const result = await pool.query(
        "UPDATE tasks SET title = $1, description = $2 WHERE id = $3",
        [title, description, id]
    );

    if (result.rowCount < 1) {
        return res.status(404).json({ message: "task is not found" });
    }
    return res.status(200).json({ message: "task updated successfully" });
});


router.delete("/delete", async (req, res) => {
    const { task_id } = req.body;
    const result = await pool.query("DELETE FROM tasks WHERE id=$1", [task_id]);
    if (result.rowCount < 1) {
        return res.status(404).json({ message: "task is not found" });
    }
    return res.status(200).json({ message: "task deleted successfully" });
})


export default router;