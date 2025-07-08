require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const activityRoutes = require('./routes/activities.js')

const app = express();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error', err));

//  middleware
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/activities', activityRoutes);


// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Fitness Tracker API is running!' });
});


module.exports = app;

