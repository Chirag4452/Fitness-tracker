

const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MOngoDB'))
    .catch(err => console.error('MongoDB connection error', err));

//  middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Fitness Tracker API is running!' });
});

module.exports = app;

