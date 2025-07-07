const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        require:true,
        unique: true
    },
    password:{
        type: String,
        require:true
    },
    profileInfo:{
        age:{
            type: Number,
            min: 13,
            max:120
        },
        weight:{
            type: Number,
            min:30
        },
        height:{
            type:Number,
            min: 100
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;