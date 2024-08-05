import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(404).json({error: "no token found"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(404).json({error: "unauthorized token"})
        }

        const user = await User.findById(decoded.userId).select('-password')

        if(!user){
            return res.status(404).json({error: "user not found"})
        }

        req.user = user;

        next();

    } catch (err) {
        console.log(`authorization error: ${err.message}`)
        res.status(404).json({error: "server error"})
    }
}