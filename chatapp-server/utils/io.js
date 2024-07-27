const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");

module.exports = function(io) {
    // all about io
    // when the user is connected 
    io.on("connection", async(socket) => {
        console.log("client is connected", socket.id);

        // receive the data from the frontend
        // when we talk using "login", execute this function
        socket.on("login", async (userName, cb) => {
            // save the user info (username, token)
            try {
                const user = await userController.saveUser(userName, socket.id);
                
            // system welcome message
            const welcomeMessage = {
                chat: `${user.name} is joined to this room`,
                user: { id: null, name: "system" },
            };
            // inform the welcomeMessage to everyone
            io.emit("message", welcomeMessage);
                cb({ok:true, data:user});
            } catch(error) {
                cb({ok:false, error:error.message});
            }
        }); 

        // receive the message information sent from the front end and save it
        socket.on("sendMessage", async(message, cb) => {
            try{
            // find the user by using the socket.id
            const user = await userController.checkUser(socket.id);
            // save the message(user)
            const newMessage = await chatController.saveChat(message, user);
            io.emit("message", newMessage) //! server talks to client
            cb({ok:true});
            } catch(error) {
                cb({ok:false, error:error.message});
            }
        });

        // when the connection stops
        socket.on("disconnect", () => {
            console.log("User is disconnected");
        });
    });
};