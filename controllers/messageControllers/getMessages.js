import Message from "../../models/messageModel.js";
import Conversation from "../../models/conversationModel.js";

export const getMessages = async (req, res) => {
    try {
        const { id: userToChat } = req.params;    
        const senderId = req.user._id; //client on app

        // FIND CONVERSATION
        const conversation = await Conversation.findOne({
            members: { $all: [senderId, userToChat] },
        }).populate("messages");

        // IF CONVERSATION DOESN'T EXIST, RETURN AN EMPTY ARRAY
        if (!conversation) {
            return res.status(200).json([]);
        }

        return res.status(200).json(conversation.messages);
        
    } catch (err) {
        console.log('Error getting messages', err.message);
        res.status(500).json({
            success: false,
            message: 'Error getting messages',
            error: err.message
        })
    }
}