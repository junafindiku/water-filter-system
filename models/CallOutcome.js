// models/CallOutcome.js
const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const CallOutcomeSchema = new mongoose.Schema({
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
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SalesAgent'
	}
});
CallOutcomeSchema.plugin(findOrCreate);

module.exports = mongoose.model('CallOutcome', CallOutcomeSchema);
