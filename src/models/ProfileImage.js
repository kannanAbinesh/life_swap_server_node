/* Plugins. */
const mongoose = require('mongoose');

const profileImageSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: null
    }

});

const ProfileImage = mongoose.model('ProfileImage', profileImageSchema, 'ProfileImage');
module.exports = ProfileImage;