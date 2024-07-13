import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    tag: {
        type: String,
        trim: true
    },
    leetcode_username: {
        type: String,
        trim: true
    }
}, { timestamps:true })

const user = mongoose.model("user",userSchema);

export default user;