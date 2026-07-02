import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
const router = express.Router();


router.post("/signup", async (req, res) => {
    console.log(req.body);

    const { username, email, password } = req.body;
    if (!username) {
        return res.status(400).json({ message: "Please enter username" })
    }
    if (!email) {
        return res.status(400).json({ message: "Please enter email" })
    }
    if (!password) {
        return res.status(400).json({ message: "Please enter password" })
    }

    //if the email is already present
    const exist = await User.find({ email });
    if (exist.length!=0) {
        return res.status(400).json({ message: "The email is already exist!" })
    }

    //hashing the passwor
    //creating salt
    const salt = await bcrypt.genSalt(10);
    // console.log(salt);

    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);

    //create the resource
    const user = new User({ username, email, password: hashPassword });
    // console.log("Created user details:",user);
    if (!user) {
        return res.status(400).json({ message: "Error in creating document in mongodb" });
    }
    await user.save();

    return res.status(200).json({ message: "successfull" })
})



router.post("/login", async (req, res) => {
    const { email,password } = req.body;

    const user=await User.findOne({email});
    console.log("User detail:",user,user);
    
    const hashPassword=user.password;

    const result = await bcrypt.compare(password, hashPassword);
    if (result) {
        const token=jwt.sign({"author_id":user._id.toString(),"username":user.username,"email":user.email},process.env.JWT_SECRET,{expiresIn:"3d"});
        console.log("token-----------",token);



        res.cookie("token",token,{
            maxAge:1000*60*60*24*3,
            httpOnly:true,
            secure:false,
            sameSite:"strict"
        })
        return res.send("login successfully");
    }
    return res.send("login failed");
})

export default router;