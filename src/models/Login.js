/* Plugins. */
const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    token: {
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

const Login = mongoose.model('Login', loginSchema, 'Login');
module.exports = Login;