/* Models. */
const ProfileImage = require('../models/ProfileImage');

module.exports = {
    uploadProfilePicture: async (req, res) => {
        try {

            const { _id: userId } = req?.user;

            const newProfileImage = new ProfileImage({ userId, image: req?.files[0]?.filename });
            newProfileImage.save();

            return res.status(200).json({ status: 200, message: "Profile picture uploaded successfully" });

        } catch (error) { return res.status(400).json({ staus: 400, message: "Soemthing went wrong" }) };
    }
}