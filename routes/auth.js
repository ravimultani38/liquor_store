const express = require('express');
const bcrypt = require('bcrypt');
const Person = require('../models/person');

const router = express.Router();
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const person = await Person.findOne({ name: username });
        if (!person) {
            console.log('User not found');
            return res.redirect('/login.html?error=invalid');
        }
        
        const match = await bcrypt.compare(password, person.password);

        if (match) {
            req.session.isAuthenticated = true;
            res.redirect('/admin.html');
        } else {
            console.log('Password mismatch');
            res.redirect('/login.html?error=invalid');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).redirect('/login.html?error=server');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out.');
        }
        res.clearCookie('connect.sid');
        res.status(200).send('Logged out.');
    });
});

module.exports = router;