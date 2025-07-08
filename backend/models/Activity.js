const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const activitySchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type:{
        type: String,
        enum: ['running','cycling','workout'],
        required: true
    },
    duration:{
        type: Number,
        required: true,
        min: 1
    },
    distance:{
        type: Number,
        min:0
    },
    caloriesBurned:{
        type: Number,
        min: 0
    },
    location:{
        latitude:{
            type: Number
        },
        longitude:{
            type: Number
        }
    },
},{
    timestamps:true
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;