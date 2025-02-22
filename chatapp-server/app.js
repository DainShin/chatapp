const express = require("express");

// Database connectivity
var mongoose = require("mongoose");
var globals = require("./configs/globals"); // global variable


// to communicate with front and backend cors
const cors = require("cors");

const app = express();
app.use(cors({
    origin: "https://main--comp2068-chatapp.netlify.app",
    credentials: true
}));


mongoose
    .connect(globals.ConnectionString.MongoDB)
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(err => {
        console.log(err);
    });

module.exports = app