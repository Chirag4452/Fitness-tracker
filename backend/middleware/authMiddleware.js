const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authMiddleware = async (req, res, next) => {
    try{
        const token = req.header('Authorization');
        console.log('Token received: ', token);

        if(!token){
            return res.status(401).json({message: "No token provided" })
        }
        const actualToken = token.replace('Bearer ', '');

        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log('Error in middleware:', error.message);
        res.status(401).json({message: 'Acess denied' });
    }
};

module.exports = authMiddleware;