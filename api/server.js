const http = require("http"); // Node.js built-in module for creating HTTP servers
const mongoose = require("mongoose");
const express = require("./express");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/users"

mongoose.connect(MONGO_URI)
    .then(()=> {
        console.log("DB Connected");

        const server = http.createServer(express)
        server.listen(5000, () => {
            console.log("Server started, port 5000")
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed: ", err);
        process.exit(1);
    });


// const server = http.createServer(express);
// server.listen(5000, console.log("Server started"));

