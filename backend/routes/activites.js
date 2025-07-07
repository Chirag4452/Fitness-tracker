

const express = require('express');
const router = express.Router();
const Activity = require('..models/Activity')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req,res) => {
    try{
        const { type, duration, distance, caloriesBurned, location } = req.body;

        const activity = new Activity({
            type, 
            duration,
            distance, 
            caloriesBurned, 
            location
        });
        await activity.save();
        res.json({message: 'Activity registered successfully' });
    } catch (error){
        res.status(400).json({error: error.messsage});
    }
});

module.exports = router;