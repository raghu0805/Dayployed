import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    id: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "low"
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, 
{timestamps: true}
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;