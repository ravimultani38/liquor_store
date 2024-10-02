const express = require('express');
const path = require('path');

const router = express.Router();

function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next();
    } else {
        res.redirect('/login.html');
    }
}

router.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

module.exports = router;