const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const CallHistoryEntrySchema = new mongoose.Schema({
	datetime: Date,
	outcome: {
		type: String,
		enum: ['No answer', 'Another outcome', 'Excessive argument', 'Successful call']
	},
});

CallHistoryEntrySchema.plugin(findOrCreate);

module.exports = mongoose.model('CallHistoryEntry', CallHistoryEntrySchema);