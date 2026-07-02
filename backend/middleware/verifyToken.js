import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.send("token is not present");
    }
    // return res.send("token is not present");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Input", decoded);
    req.author_id=decoded.author_id;
    next();
}

export default verifyToken;