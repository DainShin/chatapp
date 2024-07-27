import {io} from "socket.io-client"

const socket = io("https://chatapp-5zvc.onrender.com", {
    withCredentials: true,
});

export default  socket;