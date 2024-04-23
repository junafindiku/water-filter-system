const AgentMeeting = require('../models/AgentMeeting');
const CallHistoryEntry = require('./CallHistoryEntry');

exports.phoneAgentDashboard = (req, res) => {
	if (req.isAuthenticated() && req.user.role === 'Phone Agent') {
		res.render('phone-agent');
	} else {
		res.redirect('/');
	}
};

exports.getSalesAgentSchedule = async (req, res) => {
	try {
		const currentDate = new Date();
		const oneWeekFromNow = new Date(currentDate);
		oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
		const allAgents = await SalesAgent.find({}, '_id');

		const agentAvailabilities = await Promise.all(allAgents.map(async (agent) => {
			const availability = await SalesAgentAvailability.findOne({
				agent: agent._id,
				'timeSlots': { $gte: currentDate, $lte: oneWeekFromNow }
			});
			return { agent, availability };
		}));
		console.log(agentAvailabilities);
		res.render('phone-agent/sales-agent-schedule', {agentSchedule: agentAvailabilities });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Failed to retrieve sales agents availability' });
	}
};

exports.getLoggedInAgentCallHistoryLast24Hours = async (req, res) => {
    try {
        const agentId = req.user._id;
        const twentyFourHoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
        const currentTime = new Date();

        const callHistory = await CallHistoryEntry.find({
            assignedAgent: agentId,
            datetime: {
                $gte: twentyFourHoursAgo,
                $lte: currentTime //Current time
            }
        })
        .select('datetime outcome reserved')
        .exec();
        
		res.json(callHistory);
    } catch (error) {
		res.status(500).json({ error: 'Failed to retrieve call history for the last 24 hours' });
    }
}

exports.makeCalls = async (req, res) => {
    try {
        const { phoneNumber, outcome, scheduledDateTime } = req.body;
        const agentId = req.user._id; 
        const callHistoryEntry = new CallHistoryEntry({
            number: phoneNumber,
            assignedAgent: agentId,
            datetime: new Date(),
            outcome,
            reserved: false 
        });
        await callHistoryEntry.save();
        if (outcome === 'No answer') {
            const now = new Date();
            const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0); //Set the scheduled time to 6 PM today
            const scheduledMeeting = new AgentMeeting({
                userId: agentId,
                meetingType: 'Scheduled',
                datetime: scheduledTime,
                successful: false,
                canceled: false,
                canceledBy: null
            });
            await scheduledMeeting.save();
        } else if (outcome === 'Another outcome') {
            // const scheduledMeeting = new AgentMeeting({
            //     userId: agentId,
            //     meetingType: 'Scheduled',
            //     datetime: scheduledDateTime, 
            //     successful: false,
            //     canceled: false,
            //     canceledBy: null
            // });
            // await scheduledMeeting.save();
        } else if (outcome === 'Excessive argument') {
            const userToUpdate = await User.findOneAndUpdate({ _id: agentId }, { redList: true });
            if (!userToUpdate) {
                return res.status(404).json({ error: 'User not found' });
            }
        } else if (outcome === 'Successful call') {
            const scheduledMeeting = new AgentMeeting({
                userId: agentId,
                meetingType: 'Scheduled',
                datetime: scheduledDateTime,
                successful: true,
                canceled: false,
                canceledBy: null
            });
            await scheduledMeeting.save();
        }
        res.status(201).json({ message: 'Call made successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to make call' });
    }
}

exports.meetingSetup = async (req, res) => {
    try {
        const { clientName, agentName, dateTime } = req.body;
        const clientUser = await User.findOne({ name: clientName });
        if (!clientUser) {
            return res.status(404).json({ error: 'Client not found' });
        }
        const agentUser = await User.findOne({ name: agentName });
        if (!agentUser) {
            return res.status(404).json({ error: 'Sales agent not found' });
        }
		const scheduledMeeting = new AgentMeeting({
			userId: agentUser._id,
			clientId: clientUser._id,
			meetingType: 'Scheduled',
			datetime: scheduledDateTime,
			successful: true,
			canceled: false,
			canceledBy: null
		});
		await scheduledMeeting.save();
        res.status(201).json({ message: 'Meeting scheduled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to schedule meeting' });
    }
}

exports.reservedCalls = async (req, res) => {
    try {
        const agentId = req.user._id;
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const reservedPhoneCalls = await CallHistoryEntry.find({
            datetime: { $gte: today }, 
            assignedAgent: agentId, 
            reserved: true 
        });
        res.json(reservedPhoneCalls);
    } catch (error) {
        console.error('Error retrieving reserved phone calls:', error);
        res.status(500).json({ error: 'Failed to retrieve reserved phone calls' });
    }
}