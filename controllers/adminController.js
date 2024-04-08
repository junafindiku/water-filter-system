const User = require('../models/User');
const {roleIdByTitle} = require('../middlewares/roleIdByTitle');

exports.adminDashboard = async (req, res) => {
	res.render('admin');
};

exports.createUser = async (req, res) => {
	try {
		const {username, name, password, role } = req.body;
		const roleId = await roleIdByTitle(role);
		console.log({
			role,
			roleId
		});
		const newUser = new User({ username, name, roleId });
		await User.register(newUser, password);
		res.redirect('/admin');
	} catch (error) {
		console.error(error);
		res.redirect('/admin');
	}
};