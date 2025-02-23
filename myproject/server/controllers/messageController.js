const modelConversation = require("../models/conversationModel.js");
const modelMessage = require("../models/messageModel.js");
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.userId;

        let conversation = await modelConversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await modelConversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new modelMessage({
            senderId,
            receiverId,
            message,
        });

        await newMessage.save(); 
        conversation.messages.push(newMessage._id);
        await conversation.save(); 
        res.status(201).send(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

    console.log("Message sent", req.params.id);
};


module.exports = sendMessage