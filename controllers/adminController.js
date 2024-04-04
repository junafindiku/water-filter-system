const User = require('../models/User');

exports.adminDashboard = async (req, res) => {
	if (req.isAuthenticated()) {
		await User.findById(req.user._id)
    		.populate('roleId')
  		    .exec()
			.then(user => {
				console.log('User with populated role:', user);
			});
		res.render('admin');
	} else {
		res.redirect('/');
	}
};

exports.createUser = async (req, res) => {
	const { username, fullname, password, role } = req.body;
	try {
		const newUser = new User({ username, fullname, role });
		await User.register(newUser, password);
		res.redirect('/admin');
	} catch (error) {
		console.error(error);
		res.redirect('/admin');
	}
};