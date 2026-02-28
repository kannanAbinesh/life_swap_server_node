/* Plugins. */
const mongoose = require('mongoose');

/* Models. */
const User = require('../models/Users');

module.exports = {
    getUsers: async (req, res) => {
        try {

            /* Variables. */
            const { page = 1, limit = 20, search = "" } = req?.query;
            const skip = (page - 1) * limit;
            let condition = {};

            if (req?.user?.role === 'user') condition._id = new mongoose.Types.ObjectId(req?.user?._id);
            if (search) {
                condition = {
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: "i" } },
                        { phoneNumber: { $regex: search, $options: "i" } }
                    ]
                };
            };

            const users = await User.aggregate(
                [
                    { $match: condition },
                    { $lookup: { from: "ProfileImage", localField: "_id", foreignField: "userId", as: "profileImage" } },
                    { $unwind: { path: "$profileImage", preserveNullAndEmptyArrays: true } },
                    { $addFields: { profileImage: "$profileImage.image" } },
                    { $project: { _id: 1, firstName: 1, lastName: 1, email: 1, phoneNumber: 1, dob: 1, aboutMe: 1, profileImage: 1 } },
                    ...(req?.user?.role !== "user" ? [{ $limit: limit }, { $skip: skip }] : {}),
                ]
            );

            return res.status(200).json({ status: 200, data: users });

        } catch (error) { return res.status(400).json({ status: 400, message: "Something went wrong" }) };
    }
};