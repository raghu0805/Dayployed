import jwt from "jsonwebtoken";


const authorize = (role) => {
    return (req, res, next) => {
        try {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                return res.status(401).json({ message: "the accessToken is expired!" })
            }

            const decoded = jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET);
            // console.log("the decoded message from authorize middleware:", decoded)
            if (decoded.role != role) {
                return res.status(403).json({ message: "the user is not authorized!" })
            }
            req.role = decoded.role;
            next();
        } catch (error) {
            console.log("Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default authorize;
