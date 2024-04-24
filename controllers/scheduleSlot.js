const ScheduleSlot = require("../models/ScheduleSlot");


exports.hasPermission = (role) => {
	return role.scheduleSlotAdd;
}

exports.post = async (req, res)=> {

	var {
		slotStartDateTime,
		slotEndDateTime
	} = req.body;


	if (slotStartDateTime === undefined) {
		return res.json({success: false, message: 'Missing slotStartDateTime parameter'});
	}
	if (slotEndDateTime === undefined) {
		return res.json({success: false, message: 'Missing slotEndDateTime parameter'});
	}

	//verify the duration
	slotStartDateTime = new Date(slotStartDateTime);
	var slotStartTimeStamp = slotStartDateTime.getTime()/1000,
	slotStartHours = slotStartDateTime.getHours(),
	//slotStartMinutes = slotStartDateTime.getMinutes(),

	slotEndDateTime = new Date(slotEndDateTime);
	slotEndTimeStamp = slotEndDateTime.getTime()/1000,
	slotEndHours = slotEndDateTime.getHours();
	slotEndMinutes = slotEndDateTime.getMinutes();

	var sevenDays = 7 * 24 * 60 * 60;
	if (slotEndTimeStamp > Date.now() + sevenDays) {
		return res.json({success: false, message: 'The slot cannot end later than 7 days from now.'});
	}

	const maxSlotSeconds = 1.5 * 60 * 60; //1.5 hours
	const duration = slotEndTimeStamp - slotStartTimeStamp;

	if (duration != maxSlotSeconds) {
		return res.json({success: false, message: 'The slot duration is '+duration+', while it should not exceed '+maxSlotSeconds+' seconds.'});
	}

	if (slotStartHours < 8) {
		return res.json({success: false, message: 'The slot needs to start after 08:00'});
	}

	if (slotEndHours > 21 || slotStartHours == 21 && slotStartMinutes > 30) {
		return res.json({success: false, message: 'The slot needs to end before 21:30'});
	}

	const loggedInUserId = req.user._id;

	//slot free
	//search slots which are in the range

	const ScheduleSlot = require('../models/ScheduleSlot');


	const result = await ScheduleSlot.find({ //query today up to tonight
		$or: [
			{
				slotStart: {
					$gte: slotStartDateTime,
					$lt: slotEndDateTime,
				}
			},
			{
				slotEnd: {
					$gte: slotStartDateTime,
					$lt: slotEndDateTime,
				}
			}
		],
		agentId: loggedInUserId.toString()
	});

	if (result.length) {
		return res.json({success: false, message: 'The slot is taken'});
	}

	//add slot
	const newSlot = await ScheduleSlot.create({
		agentId: loggedInUserId,
		slotStart: slotStartDateTime,
		slotEnd: slotEndDateTime
	});

	newSlot.save().then(slot => {
		res.json({success: true, slotId: slot._id});
	}).catch(er => {
		res.json({success:false, message: 'Failed to save slot'})
	});
}
