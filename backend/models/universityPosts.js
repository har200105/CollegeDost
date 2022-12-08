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

    university: {
        type: String,
        required: true
    },

    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    hasBeenCommented: {
        type: Boolean,
        default: false
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
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

    hashtag: {
        type: Array
    }

}, { timestamps: true })



const UniversityPost = mongoose.model("UniversityPost", postSchema);

module.exports = UniversityPost;