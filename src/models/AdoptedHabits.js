/* Plugins. */
const mongoose = require('mongoose');

const adoptedHabitSchema = new mongoose.Schema({

    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
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

adoptedHabitSchema.pre(/^find/, function () { this.where({ deletedAt: null }) });

const AdoptedHabit = mongoose.model('AdoptedHabit', adoptedHabitSchema, 'AdoptedHabit');
module.exports = AdoptedHabit;