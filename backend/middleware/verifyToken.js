import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    console.log(accessToken);

    if (!accessToken) {
        return res.status(401).json({
            message: "Token not found"
        });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET);

        req.author_id = decoded.author_id;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default verifyToken;