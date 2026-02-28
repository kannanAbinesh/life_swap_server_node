/* Models. */
const Users = require('../models/Users');

module.exports = {
    register: async (req, res) => {
        try {

            /* Variables. */
            const { firstName, lastName, email, phoneNumber, password, dob, aboutMe } = req?.body;

            /* Check the required data is send from the client to register users. */
            if (!firstName || !email || !phoneNumber || !password || !dob) return res.status(400).json({ status: 400, message: "Please provide all required data" });

            /* Verify the users is trying to register using the pre existing phone number and email. */
            const existingUser = await Users.findOne({ $and: [{ email }, { phoneNumber }] });
            if (existingUser) return res.status(400).json({ status: 400, message: "Email or phone number is already in use" });

            /* Add new users. */
            const newUser = new Users({ firstName, lastName, email, phoneNumber, password, dob, lastName, aboutMe });
            newUser.save();

            return res.status(200).json({ status: 200, message: "Registration successfull" });

        } catch (error) { return res.status(400).json({ status: 400, message: "Something went wrong" }) }
    }
};