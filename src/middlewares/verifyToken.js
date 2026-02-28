/* Plugins. */
const jwt = require('jsonwebtoken');

/* Helpers. */
const { access_token } = require('../../config')

/* Variables. */
const publicRoutes = ['/login', '/register', '/google', '/googleLogin'];

module.exports = {
    verifyToken: async (req, res, next) => {
        try {

            /* Public routes. */
            if (publicRoutes.includes(req?.path)) return next();

            /* Decode the JWT token. */
            const token = req.header('Authorization').replace('Bearer ', '');
            if (!token) return res.status(401).json({ status: 401, message: "Unauthorized user" });

            /* Get current user login data ans supply to the API's. */
            const decodedData = await jwt.verify(token, access_token);
            req.user = decodedData;
            next();

        } catch (error) { return res.status(401).json({ status: 401, message: "Unauthorized users" }) };
    }
};