const mongoose = require('mongoose');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        default: "https://res.cloudinary.com/harshit111/image/upload/v1627476264/fqnrpqlujucrotiazxvc.png"
    },


    name: {
        type: String,
        required: true,
    },

    university: {
        type: String,
        required: true
    },

    verified: {
        type: Boolean,
        default: false
    },

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    isAdmin: {
        type: Boolean,
        default: false
    },

    verifyEmailToken:  String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,


});

userSchema.methods.createResetToken = async () => {
    console.log("Method")
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = async (password) => {
    console.log("PASSWORD")
    this.password = password;
}


const User = mongoose.model("User", userSchema);

module.exports = User;