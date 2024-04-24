const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const RoleSchema = new mongoose.Schema({
	title: String, //reference, client, admin, agent, coo, manager
	scheduleSlotAdd: Boolean,
	canViewSales: Boolean,
	canEditMeetings: Boolean,
	canAddScheduleSlot: Boolean
});

RoleSchema.plugin(findOrCreate);

module.exports = mongoose.model('Role', RoleSchema);