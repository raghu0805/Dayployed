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


        //create access token and session token.

        const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15min" });
        console.log("accesstoken-----------", accessToken);
        const refreshToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30d" });
        console.log("refreshtoken-----------", refreshToken);

        //hashing the passwor
        //creating salt
        const salt = await bcrypt.genSalt(10);
        // console.log(salt);

        const hashPassword = await bcrypt.hash(password, salt);
        console.log(hashPassword);


        const hashRefreshToken = await bcrypt.hash(refreshToken, salt);
        console.log("refresh token:", refreshToken, "hashed refresh token:", hashRefreshToken);

        //create the resource
        const user = new User({ username, email, password: hashPassword, refreshToken: hashRefreshToken });
        // console.log("Created user details:",user);
        if (!user) {
            return res.status(400).json({ message: "Error in creating document in mongodb" });
        }
        await user.save();
        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
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
        console.log("User detail:", user, user);

        const hashPassword = user.password;

        const result = await bcrypt.compare(password, hashPassword);
        if (result) {

                    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15min" });
        console.log("accesstoken-----------", accessToken);
        const refreshToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30d" });
        console.log("refreshtoken-----------", refreshToken);


                //creating salt
        const salt = await bcrypt.genSalt(10);
        // console.log(salt);

        const hashRefreshToken = await bcrypt.hash(refreshToken, salt);
        const update=await User.updateOne({email},{refreshToken:hashRefreshToken})



            res.cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
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


router.post("/refresh",async(req,res)=>{
    try {
        const refreshToken=req.cookies.refreshToken;
        const decoded=jwt.verify(refreshToken,process.env.JWT_SECRET);


        const accessToken=jwt.sign({ email: decoded.email },process.env.JWT_SECRET,{expiresIn:"15m"});
            res.cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: false,
                sameSite: "strict"

            });
            return res.status(200).json({message:"Access token generated successfully"});
        
    } catch (error) {
               return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
})

export default router;