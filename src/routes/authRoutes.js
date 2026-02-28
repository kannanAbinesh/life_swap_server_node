/* Plugins. */
const authRoutes = require('express').Router();
const passport = require("passport");

/* Helpers. */
const upload = require('../configurations/multer');

/* Controllers. */
const { register } = require('../controllers/register');
const { verifyMail } = require('../controllers/verifyMail');
const { login } = require('../controllers/login');
const { uploadProfilePicture } = require('../controllers/uploadProfilePicture');
const { googleLogin } = require('../controllers/googleLogin');

/* Middlewares. */
authRoutes.post('/verifyMail', verifyMail);
authRoutes.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }));
authRoutes.get("/googleLogin", passport.authenticate("google", { session: false }), googleLogin);
authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/uploadProfilePicture', upload.array('files', 1), uploadProfilePicture)

module.exports = authRoutes;