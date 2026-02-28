/* Plugins. */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Helpers. */
const { access_token } = require('../../config');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: String,

    email: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: false,
        default: null
    },

    password: String,

    dob: {
        type: String,
        required: false
    },

    aboutMe: {
        type: String,
        default: null
    },

    googleId: {
        type: String,
        default: null
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

/* Hash password. */
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return "";
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/* Compare the entered password. */
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

/* Generate JWT token. */
userSchema.methods.generateToken = function () {
    let token = jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        createdAt: this.createdAt
    }, access_token);
    return token;
};

/* Pre defined hooks or middleware to get only the users who are not deleted. here deleted represents the soft delete. */
userSchema.pre(/^find/, function () { this.where({ deletedAt: null }) });

const User = mongoose.model('User', userSchema, 'User');
module.exports = User;