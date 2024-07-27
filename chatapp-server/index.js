const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");
var globals = require("./configs/globals");

// 1. create http server
const httpServer = createServer(app);

// 2. creating web socket server on top of the http server
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// 3. setting web socket server
require("./utils/io")(io);

// 4. turn on the http server
httpServer.listen(globals.ConnectionString.PORT, () => {
    console.log("Server listening on port", globals.ConnectionString.PORT);
});