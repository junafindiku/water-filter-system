const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const ScheduleSlotSchema = new mongoose.Schema({
	datetime: Date
});

ScheduleSlotSchema.plugin(findOrCreate);

module.exports = mongoose.model('ScheduleSlot', ScheduleSlotSchema);