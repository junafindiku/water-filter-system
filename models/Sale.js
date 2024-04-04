const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const SaleSchema = new mongoose.Schema({
	agentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	approved: Boolean
});

SaleSchema.plugin(findOrCreate);

module.exports = mongoose.model('Sale', SaleSchema);