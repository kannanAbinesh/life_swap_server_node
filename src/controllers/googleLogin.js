/* Plugins. */
const jwt = require('jsonwebtoken');

/* Models. */
const Login = require('../models/Login');

/* Helpers. */
const { access_token } = require('../../config');

module.exports = {
    googleLogin: async (req, res) => {
        try {

            let token = jwt.sign({
                _id: req?.user?._id,
                firstName: req?.user?.firstName,
                lastName: req?.user?.lastName,
                email: req?.user?.email,
                createdAt: req?.user?.createdAt
            }, access_token);

            const loginDetails = new Login({ userId: req?.user?._id, token });
            loginDetails.save();

            return res.status(200).json({ status: 200, message: "Login successfull" });

        } catch (error) { return res.status(400).json({ status: 400, message: "Something went wrong" }) };
    }
};