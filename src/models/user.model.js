const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    }

}, {timestamps: true})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel