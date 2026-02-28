/* Plugins. */
const mongoose = require('mongoose');

/* Models. */
const Habit = require('../models/Habits');
const AdoptedHabit = require('../models/AdoptedHabits');

module.exports = {
    getHabits: async (req, res) => {
        try {

            /* Variables. */
            const { page = 1, limit = 10, search = "", type = "browseHabits" } = req?.query;
            const skip = (Number(page) - 1) * Number(limit);

            let condition = {};

            if (type === 'adoptedHabits') {

                if (search) {
                    condition = {
                        $or: [
                            { "habit.name": { $regex: search, $options: "i" } },
                            { "habit.description": { $regex: search, $options: "i" } },
                            { "habitCreator.name": { $regex: search, $options: "i" } }
                        ]
                    }
                };

                condition.userId = new mongoose.Types.ObjectId(req?.user?._id);

                const adoptedHabitsList = await AdoptedHabit.aggregate(
                    [
                        { $match: condition },
                        { $lookup: { from: "Habit", localField: "habitId", foreignField: "_id", as: "habit" } },
                        { $unwind: { path: "$habit" } },
                        { $lookup: { from: "HabitImages", localField: "habit._id", foreignField: "habitId", as: "habitImages" } },
                        { $lookup: { from: "User", localField: "habit.userId", foreignField: "_id", as: "habitCreator" } },
                        { $unwind: { path: "$habitCreator", preserveNullAndEmptyArrays: true } },
                        { $lookup: { from: "ProfileImage", localField: "userId", foreignField: "userId", as: "profilePicture" } },
                        { $unwind: { path: "$profilePicture" } },
                        {
                            $addFields: {
                                habitCreator: {
                                    name: { $concat: ["$habitCreator.firstName", " ", "$habitCreator.lastName"] },
                                    _id: "$habitCreator._id",
                                    email: "$habitCreator.email",
                                    phoneNumber: "$habitCreator.phoneNumber",
                                    profilePicture: "$profilePicture.image"
                                },
                                habitName: "$habit.name",
                                habitId: "$habit._id",
                                habitDescription: "$habit.description",
                                habitImages: {
                                    $map: {
                                        input: "$habitImages",
                                        as: "image",
                                        in: {
                                            "_id": "$$image._id",
                                            "image": "$$image.image"
                                        }
                                    }
                                }
                            }
                        },
                        {
                            $project: {
                                habitName: 1, habitImages: 1, habitDescription: 1,
                                "habitCreator._id": 1, "habitCreator.name": 1, "habitCreator.email": 1, "habitCreator.phoneNumber": 1, "habitCreator.profilePicture": 1
                            }
                        },
                        { $skip: skip },
                        { $limit: Number(limit) }
                    ]
                );

                return res.status(200).json({ status: 200, data: { adoptedHabitsList } });

            } else {

                if (search) {
                    condition = {
                        $or: [
                            { habitName: { $regex: search, $options: 'i' } },
                            { description: { $regex: search, $options: "i" } },
                            { "user.phoneNumber": { $regex: search, $options: "i" } },
                            { "user.firstName": { $regex: search, $options: "i" } },
                            { "user.email": { $regex: search, $options: "i" } }
                        ]
                    };
                };

                if (type === "myHabits") condition.userId = new mongoose.Types.ObjectId(req?.user?._id);
                if (type === "browseHabits") condition.userId = { $ne: new mongoose.Types.ObjectId(req?.user?._id) }

                /* Get habits. */
                const habitsDetails = await Habit.aggregate(
                    [
                        { $match: condition },
                        { $lookup: { from: "User", localField: "userId", foreignField: "_id", as: "user" } },
                        { $unwind: { path: "$user", preserveNullAndEmptyArrays: false } },
                        { $lookup: { from: "HabitImages", localField: "_id", foreignField: "habitId", as: "habitImages" } },
                        { $lookup: { from: "ProfileImage", localField: "userId", foreignField: "userId", as: "profilePicture" } },
                        {
                            $lookup: {
                                from: "AdoptedHabit",
                                let: { habitId: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ['$habitId', "$$habitId"] },
                                                    { $eq: ["$userId", new mongoose.Types.ObjectId(req?.user?._id)] }
                                                ]
                                            }
                                        }
                                    }
                                ],
                                as: "adoptedHabits"
                            }
                        },
                        { $match: type === 'browseHabits' ? { adoptedHabits: { $size: 0 } } : {} },
                        {
                            $addFields: {
                                habitDescription: '$description',
                                email: '$user.email',
                                userName: { $concat: ['$user.firstName', " ", "$user.lastName"] },
                                phoneNumber: '$user.phoneNumber',
                                dob: "$user.dob",
                                habitName: "$name",
                                aboutUser: "$user.aboutMe",
                                userId: "$user._id",
                                habitImages: {
                                    $map: {
                                        input: "$habitImages",
                                        as: "images",
                                        in: {
                                            "_id": '$$images._id',
                                            "image": '$$images.image'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            $project: {
                                userId: 1, userName: 1, email: 1, dob: 1, phoneNumber: 1, aboutUser: 1,
                                habitImages: 1, habitName: 1, habitDescription: 1
                            }
                        },
                        { $skip: skip },
                        { $limit: Number(limit) }
                    ]
                );

                return res.status(200).json({ status: 200, data: { habitsDetails } });

            };

        } catch (error) { return res.status(400).json({ status: 400, message: `Something went wrong. Error: ${error}` }) }
    }
};