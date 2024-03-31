const passport = require('passport');

const User = require('../models/User');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.login = (req, res) => {
	passport.authenticate("local")(req, res, async function () {
		try {
			const loggedInUser = await User.findById(req.user._id);
			const loggedInUserRole = loggedInUser.role;
			const roleRedirectMap = {
				'Admin': 'admin',
				'Phone Agent': 'phone-agent'
				// Add more roles
			};
			const redirectPath = roleRedirectMap[loggedInUserRole];
			if (redirectPath) {
				res.redirect(redirectPath);
			} else {
				res.redirect("index");
			}
		} catch (error) {
			console.error(error);
			res.redirect("login");
		}

	});
}

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/login');
};