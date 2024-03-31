const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const PhoneCallSchema = new mongoose.Schema({
	phoneNumber: {
		type: String,
		required: true
	},
	callHistory: [{
		timestamp: {
			type: Date,
			default: Date.now
		},
		outcome: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CallOutcome'
		}
	}],
	reservedForToday: {
		type: Boolean,
		default: false
	}
});

PhoneCallSchema.plugin(findOrCreate);

module.exports = mongoose.model('PhoneCall', PhoneCallSchema);
