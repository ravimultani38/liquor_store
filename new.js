const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Person = require('./Person'); // Adjust path as needed

const uri = 'mongodb://localhost:37017/liquorDb'; // Replace with your database URI
const saltRounds = 10; // Number of salt rounds for bcrypt

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');
        
        // Find all persons with unhashed passwords
        const persons = await Person.find({ password: { $type: 'string' } });
        
        console.log(`Found ${persons.length} persons to update`);

        // Iterate through each person and hash the password
        for (const person of persons) {
            try {
                const hashedPassword = await bcrypt.hash(person.password, saltRounds);
                await Person.updateOne({ _id: person._id }, { $set: { password: hashedPassword } });
                console.log(`Updated password for person with ID ${person._id}`);
            } catch (error) {
                console.error(`Error updating password for person with ID ${person._id}:`, error);
            }
        }
        
        console.log('Password hashing complete');
        mongoose.disconnect();
    })
    .catch(error => {
        console.error('Error connecting to MongoDB', error);
    });
