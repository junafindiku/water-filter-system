const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const CallHistoryEntrySchema = new mongoose.Schema({
	number: Number,
	assignedAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	datetime: Date,
	outcome: {
		type: String,
		enum: ['No answer', 'Another outcome', 'Excessive argument', 'Successful call']
	},
	reserved: Boolean
});

CallHistoryEntrySchema.plugin(findOrCreate);

module.exports = mongoose.model('CallHistoryEntry', CallHistoryEntrySchema);