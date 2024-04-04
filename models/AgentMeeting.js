const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const AgentMeetingSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	meetingType: {
		type: String,
		enum: ['In person', 'Phone']
	},
	agentScheduleSlotId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'AgentScheduleSlot'
	},
	successful: Boolean,
	canceled: Boolean,
	canceledBy: {
		type: String,
		enum: ['agent', 'client']
	}
});

AgentMeetingSchema.plugin(findOrCreate);

module.exports = mongoose.model('AgentMeeting', AgentMeetingSchema);