const mongoose = require('mongoose');

const url = 'mongodb://localhost:37017/liquorDb';

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
};

module.exports = connectDB;
