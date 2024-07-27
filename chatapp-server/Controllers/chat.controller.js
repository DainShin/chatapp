const Chat = require("../Models/chat")
const chatController = {}

chatController.saveChat = async(message,user) => {
    const newMessage = new Chat({
        chat:message,
        user:{
            // user._id : the id that mongodb gave 
            id:user._id, 
            name:user.name
        }
    });
    await newMessage.save();
    return newMessage;
}

module.exports = chatController