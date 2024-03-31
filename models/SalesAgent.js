const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const SalesAgentSchema = new mongoose.Schema({
	name: String,
	schedule: [{
		date: Date,
		appointments: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Meeting'
		}]
	}],
	latestReferences: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	}],
	redList: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	}],
	phoneCalls: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PhoneCall'
	}]
});

SalesAgentSchema.plugin(findOrCreate);

module.exports = mongoose.model('SalesAgent', SalesAgentSchema);