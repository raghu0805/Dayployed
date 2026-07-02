import jwt from "jsonwebtoken";
import User from "../models/User";

const verifyToken = (req, res, next) => {
    const token = req.cookies.accesstoken;

    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        });
    }

    try {
        const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);

        req.author_id = decoded.author_id;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};





export default verifyToken;