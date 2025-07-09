

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

router.put('/:id', authMiddleware, async (req, res) => {
    try{
        const activityId = req.params.id;
        const activity = await Activity.findById( activityId );
        if(!activity){
            return res.status(404).json({message: "Activity not found"});
        }
        if(activity.userID != req.user._id){
            return res.status(403).json({message: 'User does not own the activity'})
        }
        const { type, duration, distance, caloriesBurned, location } = req.body;
        const updatedActivity = await Activity.findByIdAndUpdate( activityId,
            { type, duration, distance, caloriesBurned, location },
            { new: true, runValidators: true }
        );
        res.json({
            message: 'Activity updated successfully',
            activity: updatedActivity
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const activityId = req.params.id;
        const activity = await Activity.findById( activityId );
        if(!activity){
            return res.status(404).json({message: "Activity not found"});
        }
        if(activity.userID != req.user._id){
            return res.status(403).json({message: 'User does not own the activity'})
        }
        const deletedActivity = await Activity.deleteOne( { _id: activityId } );
        res.json({
            message: 'Activity deleted successfully',
            activity: deletedActivity
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;