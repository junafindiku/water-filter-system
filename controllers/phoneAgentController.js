exports.phoneAgentDashboard = (req, res) => {
	if (req.isAuthenticated() && req.user.role === 'Phone Agent') {
		res.render('phone-agent');
	} else {
		res.redirect('/login');
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