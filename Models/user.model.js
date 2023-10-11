const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    confirm_password: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


const User = model("users", userSchema);

module.exports = User