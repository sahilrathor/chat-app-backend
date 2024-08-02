import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({message: "User logged in successfully", user: user});
    } catch (error) {
        console.log("Error logging in", error);
        res.status(500).json({error: "Internal server error"});
    }
}