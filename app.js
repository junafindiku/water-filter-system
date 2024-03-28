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
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    googleId: String,
    role: String
});

const ClientSchema = new Schema({
    name: String,
    address: String,
    comments: String,
    isBuyer: Boolean
});

const CallOutcomeSchema = new Schema({
    outcomeType: {
        type: String,
        enum: ['No answer', 'Another outcome', 'Excessive argument', 'Successful call'],
        required: true
    },
    scheduledDate: Date,
    meetingScheduled: {
        type: Boolean,
        default: false
    },
    meetingAgent: {
        type: Schema.Types.ObjectId,
        ref: 'SalesAgent'
    }
});

const MeetingSchema = new Schema({
    client: ClientSchema,
    referenceInfo: String,
    availability: {
        type: Schema.Types.ObjectId,
        ref: 'SalesAgentAvailability'
    },
    timeSlot: Date
});

const PhoneCallSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    callHistory: [{
        timestamp: {
            type: Date,
            default: Date.now
        },
        outcome: CallOutcomeSchema
    }],
    reservedForToday: {
        type: Boolean,
        default: false
    }
});

const SalesAgentAvailabilitySchema = new Schema({
    agent: {
        type: Schema.Types.ObjectId,
        ref: 'SalesAgent'
    },
    timeSlots: [Date]
});

const SalesAgentSchema = new Schema({
    name: String,
    schedule: [{
        date: Date,
        appointments: [{
            type: Schema.Types.ObjectId,
            ref: 'Meeting'
        }]
    }],
    latestReferences: [ClientSchema],
    redList: [ClientSchema],
    phoneCalls: [PhoneCallSchema]
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
ClientSchema.plugin(findOrCreate);
CallOutcomeSchema.plugin(findOrCreate);
MeetingSchema.plugin(findOrCreate);
PhoneCallSchema.plugin(findOrCreate);
SalesAgentAvailabilitySchema.plugin(findOrCreate);
SalesAgentSchema.plugin(findOrCreate);

const User = new mongoose.model("User", UserSchema);
const Client = new mongoose.model('Client', ClientSchema);
const CallOutcome = new mongoose.model('CallOutcome', CallOutcomeSchema);
const Meeting = new mongoose.model('Meeting', MeetingSchema);
const PhoneCall = new mongoose.model('PhoneCall', PhoneCallSchema);
const SalesAgentAvailability = new mongoose.model('SalesAgentAvailability', SalesAgentAvailabilitySchema);
const SalesAgent = new mongoose.model('SalesAgent', SalesAgentSchema);

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

const authenticatePhoneAgent = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'Phone Agent') {
        next();
    } else {
        res.redirect('/login');
    }
};

// Apply the middleware to routes specific to phone agents
app.get('/phone-agent', authenticatePhoneAgent, (req, res) => {
    res.render('phone-agent');
});

app.get('/phone-agent/sales-agent-schedule', authenticatePhoneAgent, async (req, res) => {
    try {
        const currentDate = new Date();
        const oneWeekFromNow = new Date(currentDate);
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
        const allAgents = await SalesAgent.find({}, '_id');

        const agentAvailabilities = await Promise.all(allAgents.map(async (agent) => {
            const availability = await SalesAgentAvailability.findOne({
                agent: agent._id,
                'timeSlots': { $gte: currentDate, $lte: oneWeekFromNow }
            });
            return { agent, availability };
        }));
        console.log(agentAvailabilities);
        res.render('phone-agent/sales-agent-schedule', {agentSchedule: agentAvailabilities });
    } catch (error) {
        console.error('Error searching for sales agents availability:', error);
        res.status(500).json({ success: false, message: 'Failed to search for sales agents availability' });
    }
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
                        'Phone Agent': 'phone-agent'
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

// app.post("/phone-agent", function (req, res) {
//
// });

// Starts the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
