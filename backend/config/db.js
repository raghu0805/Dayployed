import mongoose from "mongoose";


const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch(err => {
            console.log(err, "Error in database connection");
        });
}

export default ConnectDB;