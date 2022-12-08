const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    postedBy: {
        type: ObjectId,
        ref:"User"
    },
    university:{
        type:Boolean,
        default:false
    }

}, { timestamps: true })

const AdminPosts = mongoose.model("AdminPosts", postSchema);

module.exports = AdminPosts;