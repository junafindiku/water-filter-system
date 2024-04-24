objects = {
	user: {
		id: Number,
		name: String,
		username: String,
		password: String,
		address: String,
		profession: String,
		comments: String,
		qualified: Boolean, //qualify references based on financial capabilities
		referral: String, //name of person who referred
		datetime: Date,
		contacted: Boolean,
		role_id: Number
	},
	roles: {
		id: Number,
		title: String, //reference, client, admin, agent, coo, manager
		can_view_sales: Boolean,
		can_edit_meetings: Boolean,
		can_add_scheduleslot: Boolean
	},
	agent_schedule_slot: {
		datetime: Date,
	},
	agent_meeting: {
		id: Number,
		type: 'in-person/phone',
		agent_schedule_slot_id: Number,
		successful: Boolean,
		canceled: Boolean,
		canceled_by: 'agent/client'
	},

	call_history_entry: {
		id: Number,
		datetime: Date,
		outcome: String, /*'No answer', 'Another outcome', 'Excessive argument', 'Successful call'*/
	},

	sale: {
		id: Number,
		agent_id: Number,
		approved: Boolean
	}
}