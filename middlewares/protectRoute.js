import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            })
        }

        // VERIFY TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }

        // FIND USER BY ID
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        
        req.user = user;
        
        next();

    } catch (error) {
        console.log('Error protecting route', error);
        res.status(500).json({
            success: false,
            message: 'Error protecting route',
            error: error.message
        })
    }
}