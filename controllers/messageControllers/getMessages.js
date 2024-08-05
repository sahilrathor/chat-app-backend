// import Message from "../../models/messageModel.js";
// import Conversation from "../../models/conversationModel.js";

// export const getMessages = async (req, res) => {
//     try {
//         const { id: userToChat } = req.params;    
//         const senderId = req.user._id; //client on app

//         const conversation = await Conversation.findOne({
//             participants: { $all: [senderId, userToChat] },
//         }).populate("messages");

//         if (!conversation) {
//             return res.status(200).json([]);
//         }

//         console.log('conversation: ', conversation)

//         return res.status(200).json(conversation.messages);
        
//     } catch (err) {
//         console.log(`get msg error: ${err.message}`);
//         return res.status(500).json({ error: "server message" });
//     }
// }


import Message from "../../models/messageModel.js";
import Conversation from "../../models/conversationModel.js";

export const getMessages = async (req, res) => {
    try {
        const { id: userToChat } = req.params;
        const senderId = req.user._id; // client on app
        console.log('senderId: ', senderId)
        console.log('userToChat: ', userToChat)

        // FIND CONVERSATION
        const conversation = await Conversation.findOne({
            members: { $all: [senderId, userToChat] }
        }).populate("messages");

        // IF CONVERSATION DOESN'T EXIST, RETURN AN EMPTY ARRAY
        if (!conversation) {
            console.log('No conversation found');
            return res.status(200).json([]);
        }

        console.log('conversation: ', conversation);
        return res.status(200).json(conversation.messages);
    } catch (err) {
        console.log(`get msg error: ${err.message}`);
        return res.status(500).json({ error: "server message" });
    }
};
