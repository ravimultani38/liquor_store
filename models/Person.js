// models/Person.js
const mongoose = require('mongoose');

// Define the schema for Person
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
});

// Create and export the model
module.exports = mongoose.model('Person', personSchema, 'Person'); // Explicitly specify collection name
