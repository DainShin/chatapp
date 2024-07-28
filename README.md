# Real Time Chat Application #

## Backend ##

1. Install NPM packages
    1) npm init -y
    2) npm -i express, dotenv, mongoose, http, socket.io, nodemon

2. Backend settings
    1) .env
        Add the value of the MongoDB connection string and the port number

    2) global.js
        a. Load dotenv npm to use values in env
        b. Define the database connection string and port number    

    3) app.js
        a. Load express, mongoose, cors
        b. Connect to the database using global.js

    4) index.js 
        a. Load http module and create the http server
        b. Load socket.io module and create web socket server on top of the http server
        c. Connect the server to the file which uses the socket communication
        d. Turn on the http server


3. Creating Models
    1) chat model      
        a. Create the chat schema and connect to the db
        b. This model stores the chat content and user instance

    2) user model
        a. Create the chat schema and connect to the db            
        b. This model stores the user id and user name

4. Creating Controllers
    1) chat.controller
        a. Connect to chat model 
        b. saveChat function
            save the chat message and user info

    2) user.controller
        a. Connect to user model
        b. saveUser function
            checking if the user exists -> store new user in the database
        c. checkUser function
            checking if the user by socket id and return the user    

5. Creating the App Functionality
    1) login
        when socket server detects the login, send the welcome message
            
    2) send message
        when socket server detects the "sendMessage", find the user by socket id and send the message contents to the frontend

    3) disconnect
        when the connection stops from the frontend, print the message in console



## Frontend ##

1. Install NPM packages
    1) npm init -y
    2) npm -i react, socket.io-client, web-vitals, webpack

2. Frontend settings
    1) Use socket.io-client to connect to our backend service in server.js
    2) Use React to build a template of chat app
    3) components got MessageContainer and InputField to build reusable components
    4) App.js import socket, InputField, and MessageContainer from components
    5) App.css and index.css file for styling

3. Creating the App Functionality
    1) Use socket to listen from the server named “message”
    2) askUserName function to setUser
    3) sendMessage event to send the message that user input
    4) return the message
