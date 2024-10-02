const express = require('express');
const path = require('path');
const session = require('express-session');
const connectDB = require('./db');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

const app = express();
const port = 3000;

connectDB();  // Connect to MongoDB

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Use routers
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});