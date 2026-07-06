import express from "express";
const router=express.Router();
import User from "../models/User.js";


router.get("/users",async(req,res)=>{
    try {
        const result=await User.find();
        console.log("Result:",result);
        return res.status(200).json({message:"Data fetched successfully"});
    } catch (error) {
         console.log("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

export default router;