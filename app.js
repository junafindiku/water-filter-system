const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const phoneAgentRoutes = require('./routes/phoneAgentRoutes');

const app = express();
const port = process.env.PORT || 3000;

// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'Little secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/waterfilterDB");

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/phone-agent', phoneAgentRoutes);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
