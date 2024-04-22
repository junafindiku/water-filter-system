const CallHistoryEntry = require('../models/CallHistoryEntry');
const AgentMeeting = require('../models/AgentMeeting');
const User = require('../models/User');
const {roleIdByTitle} = require('../middlewares/roleIdByTitle');

exports.allocateCalls = async (req, res) => {
    try {
        const { number, date, assignedAgent } = req.body;

        // Create reserved calls
        const reservedCalls = await CallHistoryEntry.create({
            number,
            assignedAgent,
            date,
            reserved: true
        });

        res.status(201).json({ message: 'Reserved calls allocated successfully', reservedCalls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.adjustSalesAgentSchedule = async (req, res) => {
    const agentId = req.params.agentId;
    const newDateTime = req.body.newDateTime;
    try {
        const agent = await User.findOne({ _id: agentId });
        const agentSchedule = await AgentMeeting.find({ userId: agentId })
        .populate('userId') // Populate user details if needed
        .exec();
        //edit agentSchedule
    } catch (error) {
        console.error('Error adjusting sales agent schedule:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.viewSalesAgentSchedules = async () => {
    try {
        const salesAgentId = roleIdByTitle('Sales Agent');
        const salesAgents = await User.find({ roleId: salesAgentId});

        const agentSchedules = await Promise.all(salesAgents.map(async (agent) => {
            const agentSchedule = await AgentMeeting.find({ userId: agent._id })
                .populate('userId') 
                .exec();
            return { agent, schedule: agentSchedule };
        }));
        agentSchedules.forEach(({ agent, schedule }) => {
            console.log(`Agent: ${agent.name}`);
            schedule.forEach((meeting) => {
                console.log(`- Meeting: ${meeting.datetime}, Type: ${meeting.meetingType}`);
            });
        });

        console.log('Agent schedules retrieved successfully.');
    } catch (error) {
        console.error('Error retrieving agent schedules:', error);
    }
};

exports.viewPhoneAgentStatistics = async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const phoneAgents = await User.find({ roleId: roleIdByTitle('Phone Agent')});
        // Other filters...

        const agentStatistics = [];
        for (const agent of phoneAgents) {
            const successfulCalls = await CallHistoryEntry.countDocuments({
                userId: agent._id,
                outcome: 'Successful',
                datetime: { $gte: startDate, $lte: endDate }
            });

            const agentStats = {
                agentId: agent._id,
                agentName: agent.name,
                successfulCallsCount: successfulCalls,
                // Other statistics...
            };
            agentStatistics.push(agentStats);
        }
        return res.json(agentStatistics);
    } catch (error) {
        console.error('Error fetching phone agent statistics:', error);
        return res.status(500).send('Internal Server Error');
    }
}

exports.viewSalesAgentStatistics = async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate; 
        // Other filters...
        const salesAgents = await User.find({ roleId: roleIdByTitle('Sales Agent')});

        const agentStatistics = [];
        for (const agent of salesAgents) {
            const successfulMeetingsCount = await AgentMeeting.countDocuments({
                userId: agent._id,
                successful: true,
                datetime: { $gte: startDate, $lte: endDate }
            });

            // Other statistics...
            const agentStats = {
                agentId: agent._id,
                agentName: agent.name,
                successfulMeetingsCount: successfulMeetingsCount,
                // Other statistics...
            };
            agentStatistics.push(agentStats);
        }
        return res.json(agentStatistics);
    } catch (error) {
        console.error('Error fetching sales agent statistics:', error);
        return res.status(500).send('Internal Server Error');
    }
};
