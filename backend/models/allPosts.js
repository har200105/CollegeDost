const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    hasBeenCommented: {
        type: Boolean,
        default: false
    },
    dislikes: [{
        type: ObjectId,
        ref: "User"
    }],
    comments: [{
        text: String,
        commentedBy: {
            type: ObjectId,
            ref:"User"
        },
    }],
    postedBy: {
        type: ObjectId,
        ref:"User"
    },
    hashtag: {
        type: Array
    }
}, { timestamps: true })

const AllPosts = mongoose.model("AllPost", postSchema);

module.exports = AllPosts;