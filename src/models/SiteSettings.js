/* Plugins. */
const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({

    key: {
        type: String,
        required: true,
        trim: true
    },

    value: {
        type: String,
        required: true,
        trim: true
    },

    settingsType: {
        type: String,
        enum: ['appSettings', "configSettings"],
        default: "appSettings",
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

const SiteSettings = model.model("SiteSettings", siteSettingsSchema, "SiteSettings");
module.exports = SiteSettings;