import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.send("token is not present");
    }
        return res.send("token is not present");
    const compare=jwt.verify(token,process.env.JWT_SECRET);
    console.log(compare);
    next();
}

export default verifyToken;