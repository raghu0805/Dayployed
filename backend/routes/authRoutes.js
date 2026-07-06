import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
const router = express.Router();


router.post("/signup", async (req, res) => {

    try {
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
        if (exist.length != 0) {
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
        await user.save();


        // console.log("Created user details:",user);
        if (!user) {
            return res.status(400).json({ message: "Error in creating document in mongodb" });
        }


        const accessToken = jwt.sign({ _id: user._id,role:user.role }, process.env.ACCESSTOKEN_SECRET, { expiresIn: process.env.ACCESSTOKEN_EXPIRY });
        console.log("accesstoken-----------", accessToken);
        const refreshToken = jwt.sign({ _id: user._id,role:user.role }, process.env.REFRESHTOKEN_SECRET, { expiresIn: process.env.REFRESHTOKEN_EXPIRY });
        console.log("refreshtoken-----------", refreshToken);


        const hashRefreshToken = await bcrypt.hash(refreshToken, salt);

        console.log("User *********:", user._id);
        //create access token and session token.
        await User.findByIdAndUpdate({ "_id":user._id }, { refreshToken: hashRefreshToken })

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            secure: false,
            sameSite: "strict"

        })
        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })

        return res.status(200).json({ message: "successfull" })

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }


})



router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;


        //create access token and session token.



        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        console.log("User detail:", user);

        const hashPassword = user.password;

        const result = await bcrypt.compare(password, hashPassword);
        if (result) {

            const accessToken = jwt.sign({ _id: user._id,role:user.role }, process.env.ACCESSTOKEN_SECRET, { expiresIn: process.env.ACCESSTOKEN_EXPIRY });
            console.log("accesstoken-----------", accessToken);
            const refreshToken = jwt.sign({ _id: user._id,role:user.role }, process.env.REFRESHTOKEN_SECRET, { expiresIn: process.env.REFRESHTOKEN_EXPIRY });
            console.log("refreshtoken-----------", refreshToken);


            //creating salt
            const salt = await bcrypt.genSalt(10);
            // console.log(salt);

            const hashRefreshToken = await bcrypt.hash(refreshToken, salt);
            await User.updateOne({ email }, { refreshToken: hashRefreshToken })



            res.cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 15,
                httpOnly: true,
                secure: false,
                sameSite: "strict"

            })
            res.cookie("refreshToken", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: false,
                sameSite: "strict"
            })
            return res.send("login successfully");
        }
        return res.send("login failed");

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });

    }

})




router.post("/logout",async(req,res)=>{
    try {

            const refreshToken=req.cookies.refreshToken;
    console.log(refreshToken); 

    const decode=jwt.verify(refreshToken,process.env.REFRESHTOKEN_SECRET);
    console.log(decode);





    await User.updateOne({_id:decode._id},{
        refreshToken:null
    })
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({message:"Logout successfully"});
        
    } catch (error) {
            return res.status(401).json({
            message: "Logout failure"
        });
    }

})


router.post("/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token missing"
            });
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET);
        console.log("decoded:", decoded);

        const user = await User.findOne({ "_id": decoded._id });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        console.log("the data:", user);

        const isVerified = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isVerified) {
            return res.status(401).json({ message: "Session mismatch! the token from cookie and db mismatch!" });

        }
        const accessToken = jwt.sign({ _id: user._id , role:user.role}, process.env.ACCESSTOKEN_SECRET, { expiresIn: process.env.ACCESSTOKEN_EXPIRY });
        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });



        return res.status(200).json({ message: "Access token generated successfully" });

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
})

export default router;