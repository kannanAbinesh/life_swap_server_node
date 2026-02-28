/* Models. */
const SiteSettings = require('../models/SiteSettings');

module.exports = {
    manageSiteSettings: async (req, res) => {
        try {

            /* Variables. */
            const { siteSettingsData, settingsType } = req?.body;

            if (!settingsType) return res.status(400).json({ status: 400, message: "Please enter the required values." });

            return res.status(200).json({ status: 200, message: `${settingsType === "appSettings" ? "Site settings updated successfully" : "Site config settings updated successfully"}` });

        } catch (error) { return res.status(400).json({ status: 400, message: "Somehting went wrong" }) };
    }
};