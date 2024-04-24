const passport = require('passport');

const User = require('../models/User');
const Role = require('../models/Role');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.requireAuth = (req, res) => {
	if (!req.isAuthenticated()) {
		res.redirect("/");
		return false;
	}
	return true;
}

exports.getRole = async (id) => {
	return Role.findById(id).exec();
}

exports.index = async (req, res) => {
	if (!req.isAuthenticated()) {
		res.render('login');
	}
}



exports.login = (req, res) => {

	
	passport.authenticate("local")(req, res, async function () {
		//try {
			const loggedInUser = await User.findById(req.user._id)
				.populate('roleId')
				.exec()
				.catch(error => {
					console.error('Error fetching user:', error);
				});
			const role = loggedInUser.roleId.title;
			const page = role+'/dashboard';
			res.redirect(page);

		// } catch (error) {
		// 	console.error(error);
		// 	res.redirect("login");
		// }

	});
}

exports.logout = (req, res) => {
	req.logout((err) => {
		if (!err) {
			res.redirect('/');
		}
	});

};