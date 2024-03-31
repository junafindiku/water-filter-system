const User = require('../models/User');

exports.adminDashboard = (req, res) => {
	if (req.isAuthenticated() && req.user.role === 'Admin') {
		res.render('admin');
	} else {
		res.redirect('/login');
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