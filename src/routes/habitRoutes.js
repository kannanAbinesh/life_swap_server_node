/* Plgins. */
const habitRoutes = require('express').Router();

/* Helpers. */
const upload = require('../configurations/multer');

/* Controllers. */
const { getHabits } = require('../controllers/getHabits');
const { manageHabits } = require('../controllers/manageHabits');
const { adoptHabit } = require('../controllers/adoptHabit');

/* Route declarations. */
habitRoutes.get('/getHabits', getHabits)
habitRoutes.post('/manageHabits', upload.array('files', 12), manageHabits);
habitRoutes.post('/adoptHabit', adoptHabit);

module.exports = habitRoutes;