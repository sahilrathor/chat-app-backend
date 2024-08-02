import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateJWT.js";

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = await User.create({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilepic: gender==='male' ? boyProfilePic : girlProfilePic
        });

        if (newUser) {

            await newUser.save();
            console.log('new user saved');
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({ message: "User created successfully", user: newUser });
        }

    } catch (error) {
        console.log("Error signing up", error);
        res.status(500).json({ message: "Internal server error" });
    }
};