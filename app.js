const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
// const dotenv = require('dotenv');
// dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

const router = require('./routes/userRoutes')

app.use('/', router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

mongoose.connect("mongodb://localhost:27017/waterfilterDB");

// app.use('/admin', adminRoutes);
// app.use('/phone-agent', phoneAgentRoutes);
// Role.findOne({ title: 'admin' })
//     .then(adminRole => {
//         if (adminRole) {
//             const newUser = new User({
//                 name: 'Patrik Madhi',
//                 username: 'patrickmadhi@gmail.com',
//                 roleId: adminRole._id
//             });
//
//             return User.register(newUser, 'adminadmin');
//         } else {
//             console.error('Admin role not found');
//             return null; // Return a resolved promise with null value
//         }
//     })
//     .then(savedUser => {
//         if (savedUser) {
//             console.log('User created successfully');
//         }
//     })
//     .catch(err => {
//         console.error('Error:', err);
//     });

// User.findById("660da1067c29d0061008b08b")
//     .populate('roleId')
//     .exec()
//     .then(user => {
//         console.log('User with populated role:', user);
//     })
//     .catch(error => {
//         console.error('Error fetching user:', error);
//     });
