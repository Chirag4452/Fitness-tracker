

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res) => {
    try{
        const { username, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.json({message: 'User registered successfully' });

    } catch (error){
        res.status(400).json({ error: error.message});
    }
});

router.post('/login', async (req,res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({ username});
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message: 'Password incorrect'});
        }

        const token = jwt.sign({
            userId: user._id 
        },
        process.env.JWT_SECRET,
        {expiresIn: '24hr'}
    );

    res.json({
        message: 'Login successful',
        token,
        user: {id: user._id, username: user.username}
    });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;