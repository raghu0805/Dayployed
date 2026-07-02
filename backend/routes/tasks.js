import express from "express";
import User from "../models/User.js"
import Task from "../models/Tasks.js"
const router = express.Router();

router.get("/", async (req, res) => {
    //fetch the data
    console.log(req.author_id);
    const result = await Task.find({ author: req.author_id });
    console.log("result from get route:", result);
    return res.status(200).json(result);
});



router.get("/task/:id", async (req, res) => {
    //id is the task_id
    const { id } = req.params;

    console.log(id);
    //fetch the data
    const result = await Task.find({ _id: id });
    console.log(result);
    return res.status(200).json(result);
});

//to create a task
router.post("/create", async (req, res) => {

    const { title, description } = req.body;


    if (!title) {
        return res.status(400).json({ message: "Please enter task name" })
    }
    if (!description) {
        return res.status(400).json({ message: "Please enter task description" })
    }


    const task = new Task({ title, description, author: req.author_id });
    if (!task) {
        return res.status(400).json({ message: "Unable to create task!" });
    }

    await task.save();
    return res.status(201).json({ message: "Resource created successfully" });
})


router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log("The details:", id, title, description, req.author_id);
    const task = await Task.findById(id);

    if (!task) {
        return res.status(400).json({ message: "The task doesn't exist!" });
    }
    const updatedstatus = await Task.updateOne({ _id: id, author: req.author_id }, { title, description }, { returnDocument: "after" });
    console.log("Updated result:", updatedstatus);
    if (updatedstatus.modifiedCount == 0) {
        return res.status(400).json({ message: "task is not updated!" });
    }

    return res.status(200).json({ message: "task updated successfully" });
});


router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id });
    if (!task) {
        return res.status(400).json({ message: "task doen't exist. can't delete!" });
    }

    await Task.deleteOne({ _id: id });
    return res.status(200).json({ message: "Task deleted successfully" });


})


export default router;