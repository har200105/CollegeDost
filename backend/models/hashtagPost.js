const mongoose = require('mongoose');


const hashtagPostSchema = mongoose.Schema({

    hashTagtext: {
        type: String,
        required: true
    },

    postCounts: {
        type: Number,
        default: 1
    }
});


const HashtagPost = mongoose.model("hashtagPost", hashtagPostSchema);
module.exports = HashtagPost;