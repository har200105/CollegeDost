const mongoose = require('mongoose');

const universitySchema = mongoose.Schema({
    universityName: {
        type: String,
        required: true
    },
    universityAddress: {
        type: String,
        required: true
    },
});


const UniversityData = mongoose.model("university", universitySchema);
module.exports = UniversityData;