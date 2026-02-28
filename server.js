/* Plugins. */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const session = require("express-session");

/* Helpers. */
const { port, db_url } = require('./config');
const { verifyToken } = require('./src/middlewares/verifyToken');
const authRoutes = require('./src/routes/authRoutes');
const habitRoutes = require('./src/routes/habitRoutes');
const siteSettingsRoutes = require('./src/routes/siteSettingsRoutes');
require('./src/configurations/passport');

/* Variables. */
const app = express();

/* Middlewares. */
app.use(cors());
app.use(express.json());
app.use(session({ secret: "keyboardcat", resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

/* Routes desclarations. */
app.use('/api/v1/auth', verifyToken, authRoutes);
app.use('/api/v1/habit', verifyToken, habitRoutes);
app.use('/api/v1/siteSettings', verifyToken, siteSettingsRoutes);

/* MongoDB connection functionality. */
mongoose.connect(db_url)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => {
        console.log(`Something went wrong mongoDB connection. Error: ${error}`);
        process.exit(1);
    });

app.listen(port, () => {
    console.log(`Server started running in ${port} port`);
});