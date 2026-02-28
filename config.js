/* Plugins. */
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    db_url: process.env.DB_URL,
    access_token: process.env.ACCESS_TOKEN,
    google: {
        clientId: process.env.GOOGLE_LOGIN_CLIENT_ID,
        secretId: process.env.GOOGLE_LOGIN_SECRET_ID
    }
};