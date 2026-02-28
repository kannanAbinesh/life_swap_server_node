/* Models. */
const User = require('../models/Users');

module.exports = {
    verifyMail: async (req, res) => {
        try {

        } catch (error) { return res.status(400).json({ status: 400, message: "Something went wrong" }) };
    }
};