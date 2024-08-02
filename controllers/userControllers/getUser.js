import User from "../../models/userModel.js";

export const getUser = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const otherUsers = await User.find({ _id: {$ne: loggedInUserId} }).select('-password');

        res.status(200).json(otherUsers);

    } catch (error) {
        console.log('Error getting users:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error getting users',
            error: error.message
        })
    }
}