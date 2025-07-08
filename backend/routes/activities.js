

const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req,res) => {
    try{
        const { type, duration, distance, caloriesBurned, location } = req.body;
        if(!type || !duration){
            return res.status(400).json({message: "Type or duration not entered"})
        };
        const activity = new Activity({
            userID: req.user._id,
            type, 
            duration,
            distance, 
            caloriesBurned, 
            location
        });
        await activity.save();
        res.status(201).json({message: 'Activity registered successfully',
            activity: activity
         });
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

router.get('/', authMiddleware, async(req, res) => {
    try{
        const activities = await Activity.find({
            userID: req.user._id
        });
        res.json({
            message: "Activities retrieved successfully",
            activities: activities
        });
    } catch (error){
        res.status(500).json({message: error.message});
    }
})

// New route with population example
router.get('/with-user-info', authMiddleware, async(req, res) => {
    try{
        const activities = await Activity.find({
            userID: req.user._id
        }).populate('userID', 'username email'); // Populate userID field, only include username and email
        
        res.json({
            message: "Activities with user info retrieved successfully",
            activities: activities
        });
    } catch (error){
        res.status(500).json({message: error.message});
    }
})

module.exports = router;