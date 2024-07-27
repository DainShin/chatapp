import React, { useEffect, useState } from "react";
import "./App.css";

// bring the socket from the server.js file
import socket from "./server";

import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log("message List", messageList);
  useEffect(() => {
    // if client receive something from the server named message
    socket.on("message",(message) => {
      setMessageList((prevState) => prevState.concat(message));
    });
    askUserName();
  }, []);

  // using prompt window, accepting the user name
  const askUserName = () => {
    const userName = prompt("Enter your name");
    console.log("uuu", userName);

    // using the emit method from the socket object
    // emit(title of the chatting, the contents, callback function)
    socket.emit("login", userName, (res) => {
      if (res?.ok) {
        setUser(res.data);
      }
    });
  };

  const sendMessage = (event) => {
    // stops refreshing the page(onSubmit default event)
    event.preventDefault()
    socket.emit("sendMessage", message, (res) => {
      console.log("sendMessage res", res);
    });
  }

  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user}/>
        <InputField message={message} 
                    setMessage={setMessage} 
                    sendMessage={sendMessage} 
        />
      </div>
    </div>
  );
}

export default App;
