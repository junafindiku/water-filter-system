const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const SalesAgentAvailabilitySchema = new mongoose.Schema({
	agent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SalesAgent'
	},
	timeSlots: [Date]
});

SalesAgentAvailabilitySchema.plugin(findOrCreate);

module.exports = mongoose.model('SalesAgentAvailability', SalesAgentAvailabilitySchema);
