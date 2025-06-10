const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        mobileNumber: {
            type: Number,
        },
        password: {
            type: String,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },
        country: {
            type: String
        },
        state: {
            type: String
        },
        isUser: {
            type: Boolean,
            default: true,
        },
    },
    {  timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);