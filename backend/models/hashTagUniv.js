const mongoose = require('mongoose');


const hashtagPostSchema = mongoose.Schema({

    hashTagtext: {
        type: String,
        required: true
    },

    universityName: {
        type: String,
        required: true
    },

    postCounts: {
        type: Number,
        default: 1
    }
});


const HashtagUnivPost = mongoose.model("hashtagUnivPost", hashtagPostSchema);
module.exports = HashtagUnivPost;