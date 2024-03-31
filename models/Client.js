const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const ClientSchema = new mongoose.Schema({
	name: String,
	address: String,
	comments: String,
	isBuyer: Boolean
});

ClientSchema.plugin(findOrCreate);

module.exports = mongoose.model('Client', ClientSchema);