const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
],

    messages:[
        
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    },
],
}, {timestamps: true});

const modelConversation = mongoose.model("Chat", conversationSchema);

module.exports = modelConversation