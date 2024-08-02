import Message from "../../models/messageModel.js";
import Conversation from "../../models/conversationModel.js";

export const sendMessage = async (req, res) => {
    try {

        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        // CHECK IF CONVERSATION EXISTS
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        })

        // IF CONVERSATION DOESN'T EXIST, CREATE A NEW ONE
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            })
        }

        const newMessage = Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

            // SAVES NEW MESSAGE AND CONVERSATION
            await Promise.all([
                newMessage.save(),
                conversation.save()
            ])

            // WEB SOCKET HERE
            // 

            res.status(200).json({
                success: true,
                message: "Message sent successfully",
                newMessage
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error sending message",
            error: error.message
        })
        console.log('Error sending message', error);
    }
}