const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const MeetingSchema = new mongoose.Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	referenceInfo: String,
	availability: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SalesAgentAvailability'
	},
	timeSlot: Date
});

MeetingSchema.plugin(findOrCreate);

module.exports = mongoose.model('Meeting', MeetingSchema);
