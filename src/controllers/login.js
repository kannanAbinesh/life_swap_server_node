/* Models. */
const Users = require('../models/Users');
const Login = require('../models/Login');

module.exports = {
    login: async (req, res) => {
        try {

            /* Variables. */
            const { email, password } = req?.body;

            if (!email || !password) return res.status(400).json({ status: 400, message: "Please provide required data to login" });

            /* Query to get the user details based on the  email. */
            const userDetails = await Users.findOne({ email });

            /* Send if the mail is not present. */
            if (!userDetails) return res.status(400).json({ status: 400, message: "Please register to process" });

            const isMatched = await userDetails.comparePassword(password);
            if (!isMatched) return res.status(400).json({ status: 400, message: "Invalid password" });

            /* Get JWT token. */
            const token = await userDetails.generateToken();

            /* Log the user login time. */
            const loginData = new Login({ token, userId: userDetails?._id });
            await loginData.save();

            return res.status(200).json({
                status: 200, data: {
                    token,
                    userDetails: {
                        _id: userDetails?._id,
                        firstName: userDetails?.firstName,
                        lastName: userDetails?.lastName,
                        email: userDetails?.email,
                        createdAt: userDetails?.createdAt,
                        dob: userDetails?.dob
                    }
                }
            });

        } catch (error) { return res.status(400).json({ status: 400, message: "Something went wrong" }) };
    }
};