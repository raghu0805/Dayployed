import express from "express";
import Task from "../models/Tasks.js";

const router = express.Router();

// Get all tasks of logged-in user
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({ author: req.author_id });

        return res.status(200).json(tasks);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// Get a single task
router.get("/task/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({
            _id: id,
            author: req.author_id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        return res.status(200).json(task);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// Create task
router.post("/create", async (req, res) => {
    try {

        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Please enter task title."
            });
        }

        if (!description) {
            return res.status(400).json({
                message: "Please enter task description."
            });
        }

        await Task.create({
            title,
            description,
            author: req.author_id
        });

        return res.status(201).json({
            message: "Task created successfully."
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// Update task
router.put("/update/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const { title, description } = req.body;

        const result = await Task.updateOne(
            {
                _id: id,
                author: req.author_id
            },
            {
                $set: {
                    title,
                    description
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        if (result.modifiedCount === 0) {
            return res.status(200).json({
                message: "No changes were made."
            });
        }

        return res.status(200).json({
            message: "Task updated successfully."
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// Delete task
router.delete("/delete/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const result = await Task.deleteOne({
            _id: id,
            author: req.author_id
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully."
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

export default router;