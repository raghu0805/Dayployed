import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    username:{

        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    email:{
        type:String,
        required:true,
        },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    }
});


const User=mongoose.model("User",UserSchema);

export default User;