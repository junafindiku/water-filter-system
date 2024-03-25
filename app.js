require('dotenv').config()
const express = require('express');
const path = require('path');
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    googleId: String,
    role: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/index", //where they will be redirected
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile"]
}));

app.get("/auth/google/index",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        res.redirect("/index");
    });

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/admin', (req, res) => {
    if (req.isAuthenticated() && req.user.role === 'Admin') {
       return res.render('admin');
    }
    return res.redirect('/login');
});

app.post("/signup", function (req, res) {

    const newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        role: 'Customer'
    })

    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("signup");
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("index");
            });
        }
    });
});

app.post("/login", function (req, res) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, async function () {
                try {
                    const loggedInUser = await User.findById(req.user._id);
                    const loggedInUserRole = loggedInUser.role;
                    const roleRedirectMap = {
                        'Admin': 'admin',
                        'Phone Agent': 'phoneAgent'
                        // Add more roles
                    };
                    const redirectPath = roleRedirectMap[loggedInUserRole];
                    if (redirectPath) {
                        res.redirect(redirectPath);
                    } else {
                        res.redirect("index");
                    }
                } catch (error) {
                    console.error(error);
                    res.redirect("login");
                }

            });
        }
    });
});

app.post("/admin", function (req, res) {

    const newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        role: req.body.role
    });

    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
        }
        res.redirect("admin");
    });
});

// Starts the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
