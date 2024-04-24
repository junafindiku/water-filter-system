const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const AgentMeetingSchema = new mongoose.Schema({
	agentId: Number,
	clientId: Number,
	meetingType: {
		type: String,
		enum: ['Instant', 'Scheduled']
	},
	datetime: Date,
	successful: Boolean,
	canceled: Boolean,
	canceledBy: {
		type: String,
		enum: ['agent', 'client']
	}
});

AgentMeetingSchema.plugin(findOrCreate);

module.exports = mongoose.model('AgentMeeting', AgentMeetingSchema);