const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require("mongoose-findorcreate");
const Role = require("./Role");

const User = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
	address: String,
	profession: String,
	comments: String,
	qualified: Boolean, //qualify references based on financial capabilities
	referral: String, //name of person who referred
	contacted: Boolean,
	roleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Role'
	},
	redList: {
        type: Boolean,
        default: false // Default value is false (not on the red list)
    }
});

User.plugin(passportLocalMongoose);
User.plugin(findOrCreate);


module.exports = mongoose.model('User', User);

