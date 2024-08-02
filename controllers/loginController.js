import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateJWT.js";

export const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({user: {userName: user}});
    } catch (error) {
        console.log("Error logging in", error);
        res.status(500).json({message: "Internal server error"});
    }
}