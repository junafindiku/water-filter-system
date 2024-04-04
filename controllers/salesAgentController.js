const ScheduleSlot = require('../models/AgentScheduleSlot');
const User = require('../models/User');

exports.setupSchedule = async (req, res) => {
    const { dates, timeSlots } = req.body;
    const loggedInUserId = req.user._id; 

    try {
        const scheduleSlots = await ScheduleSlot.create({ dates, timeSlots });

        await User.findByIdAndUpdate(loggedInUserId, { $set: { datetime: new Date() } });

        res.status(201).json({ success: true, message: 'Schedule setup successful', data: scheduleSlots });
    } catch (error) {
        console.error('Error setting up schedule:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.viewScheduledMeetings = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate('meetings');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const meetingDates = user.meetings.map(meeting => meeting.datetime);

        res.status(200).json({ meetings: meetingDates });
    } catch (error) {
        console.error('Error viewing scheduled meetings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};