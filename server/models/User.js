const mongoose = require('mongoose');


const userSchema  = new mongoose.Schema({
    uid:{
        type:String,
        required:true,
        unique:true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
      },
      displayName: {
        type: String, // User's name from Firebase/GitHub
        required: true,
      },
      photoURL: {
        type: String, // User's profile picture URL
      },
      authProvider: {
        type: String, // 'firebase' or 'github'
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

})

module.exports = mongoose.model("User", userSchema);