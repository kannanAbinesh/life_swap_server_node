/* Plugins. */
const mongoose = require('mongoose');

const habitImageSchema = new mongoose.Schema({

    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    image: {
        type: String,
        required: true,
        trim: true
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

const HabitImages = mongoose.model("HabitImages", habitImageSchema, "HabitImages");
module.exports = HabitImages;