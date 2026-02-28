/* Models. */
const AdoptedHabit = require('../models/AdoptedHabits');

module.exports = {
    adoptHabit: async (req, res) => {
        try {
            
            /* Variables. */
            const { _id: userId } = req?.user;
            const { habitId } = req?.body;

            /* Adopt habit. */
            const adoptHabitDetails = new AdoptedHabit({ userId, habitId });
            adoptHabitDetails.save();

            return res.status(200).json({ status: 200, message: "Habit adopted successfully" });

        } catch (error) { return res.status(400).json({ status: 400, message: "Something went wrong" }) }
    }
};