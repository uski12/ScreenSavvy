const http = require("http"); // Node.js built-in module for creating HTTP servers
const mongoose = require("mongoose");
const express = require("./express");


mongoose.connect("mongodb://127.0.0.1:27017/users").then(()=> {
    console.log("DB Connected");
});

const server = http.createServer(express);


server.listen(5000, console.log("Server started"));

