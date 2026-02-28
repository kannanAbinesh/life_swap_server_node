/* Plugins. */
const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
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
    },

    deletedAt: {
        type: Date,
        default: null
    }

});

habitSchema.pre(/^find/, function () {
    this.where({ deletedAt: null });
});

const Habit = mongoose.model('Habit', habitSchema, 'Habit');
module.exports = Habit;