const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.headers('Authorization');

        if(!token){
            return res.status(401).json({message: "No token provided" })
        }
        const actualToken = token.replace('Bearer ', '');

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({message: 'Acess denied' });
    }
};

module.exports = authMiddleware;