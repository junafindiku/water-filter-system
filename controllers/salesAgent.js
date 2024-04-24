const {getRoleIdByTitle} = require('../middlewares/roleIdByTitle');
const ScheduleSlot = require('../models/ScheduleSlot');
const User = require('../models/User');
const AgentMeeting = require('../models/AgentMeeting');

exports.dashboard = async (req, res) => {
	res.render('salesAgent/dashboard');
};


exports.viewScheduledMeetings = async (req, res) => {
	try {
		const salesAgentId = req.user._id;
		const agentSchedules = await AgentMeeting.find({userId: salesAgentId})
			.populate('userId')
			.exec();
		console.log(`Agent's ID: ${salesAgentId}`);
		agentSchedules.forEach((meeting) => {
			console.log(`- Meeting: ${meeting.datetime}, Type: ${meeting.meetingType}`);
		});

		console.log('Agent schedules retrieved successfully.');
	} catch (error) {
		console.error('Error retrieving agent schedules:', error);
	}
};

exports.addReference = async (req, res) => {
	try {
		const {
			name,
			username,
			password,
			address,
			profession,
			comments,
			qualified,
			referral,
			contacted,
			role
		} = req.body;
		const roleId = getRoleIdByTitle(role);

		const newUser = new User({
			name,
			username,
			password,
			address,
			profession,
			comments,
			qualified,
			referral,
			contacted,
			roleId
		});

		await User.register(newUser, password);

		res.status(201).json({message: 'Reference added successfully'});
	} catch (error) {
		console.error('Error adding reference:', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
};

exports.setupInstantMeeting = async (req, res) => {
	try {
		const userId = req.user._id;
		const {
			meetingType,
			datetime
		} = req.body;
		const dateObject = new Date(datetime);
		console.log(dateObject);

		// const isoDate = dateObject.toISOString();

		// console.log('ISO Date:', isoDate);

		const newMeeting = new AgentMeeting({
			userId,
			meetingType,
			dateObject,
			successful: false
		});

		await newMeeting.save();

		res.status(201).json({message: 'Instant meeting setup successfully'});
	} catch (error) {
		console.error('Error setting up instant meeting:', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
};

exports.logMeetingOutcome = async (req, res) => {
	try {
		const {
			meetingId,
			outcome
		} = req.body;
		const meeting = await AgentMeeting.findById(meetingId);

		meeting.outcome = outcome;
		await meeting.save();

		res.status(200).json({message: 'Meeting outcome logged successfully'});
	} catch (error) {
		console.error('Error logging meeting outcome:', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
};