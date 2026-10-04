const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 25,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 40,
    },
    password: {
        type: String,
        required: true,
        max: 25,
    },
    watchedList: Array,
});

module.exports = mongoose.model("User", userSchema);
