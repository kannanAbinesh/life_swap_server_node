/* Plugins. */
const fs = require('fs');

/* Models. */
const Habit = require('../models/Habits');
const HabitImages = require('../models/HabitImages');

module.exports = {
    manageHabits: async (req, res) => {
        try {

            /* Variables. */
            const { _id: userId } = req?.user;
            const { habitName, description, _id: habitId } = req?.body;

            /* Validate. */
            if (!habitName || !description) return res.status(400).json({ status: 400, message: "Please provide required data" });

            if (!habitId) { /* Create query. */

                /* Adding new habit. */
                const newHabit = new Habit({ userId, name: habitName, description });
                newHabit.save();

                /* Add images for the new habits in the Collections. */
                let habitImageData = req?.files?.map((ele) => { return { habitId: newHabit?._id, image: ele?.filename } });
                await HabitImages.insertMany(habitImageData);

                return res.status(200).json({ status: 200, message: "Habit added successfully" });

            } else { /* Update query. */

                await HabitImages.findByIdAndUpdate(habitId, { habitName, description }, { new: true });

                /* Add images for the new habits in the Collections. */
                let habitImageData = req?.files?.map((ele) => { return { habitId, image: ele?.filename } });

                return res.status(200).json({ status: 200, message: "Habit updated successfully" });
            };

        } catch (error) { return res.status(400).json({ status: 400, message: `Something went wrong. Error: ${error}` }) };
    }
};