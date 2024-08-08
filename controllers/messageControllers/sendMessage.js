import Message from "../../models/messageModel.js";
import Conversation from "../../models/conversationModel.js";
import { io } from "../../socket/socket.js";
import { getReceiverSocketId } from "../../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        // CHECK IF CONVERSATION EXISTS
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        // IF CONVERSATION DOESN'T EXIST, CREATE A NEW ONE
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderName: req.user.fullName,
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // SAVES NEW MESSAGE AND CONVERSATION
        await Promise.all([
            newMessage.save(),
            conversation.save()
        ]);

        // WebSocket - Send message to receiver
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.status(200).json(newMessage);
    } catch (err) {
        console.log(`send msg error: ${err.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};
