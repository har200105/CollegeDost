const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const ResourcesSchema = mongoose.Schema({

    resourcesname: {
        type: String,
        required: true
    },

    resourceUniversityName: {
        type: String,
        required: true
    },


    resourceUploaderName: {
        type: ObjectId,
        ref:"User"
    },

    resourceUrl: {
        type: String,
        required: true
    }

}, { timestamps: true });


const Resources = mongoose.model("Resources", ResourcesSchema);

module.exports = Resources;