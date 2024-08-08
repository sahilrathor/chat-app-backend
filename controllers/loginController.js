import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateJWT.js";


export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilepic
        })
        // console.log(`${user.userName} logged-in successfully`)

    } catch (err) {
        res.status(500).json({ error: 'server error' })
        console.log('log in error: ', err.message)
    }
}