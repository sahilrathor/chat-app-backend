import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateJWT.js";

export const signup = async (req, res) => {

    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body
        if(password !== confirmPassword){
            return res.status(400).json({error: "password don't match"});
        }

        const user = await User.findOne({userName});  //CHECKS FOR THE EXISTING USER
        if(user) {
            return res.status(400).json({error: "User already exists"});
        }

        // HASH THE PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilepic: gender === 'male' ? boyProfilePic : girlProfilePic
        })


        if(newUser){  //RUNS IF USER DATA IS VALID

            // JWT TOKEN HERE
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();  //save new user to db
            // console.log('New user added')
            
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilepic
            })
        } else{
            console.log('wrong user data: ', err.message)
        }


    }
    catch (err) {
        res.status(500).json({error: 'server error'})
        console.log('sign up error: ', err.message)
    }
};