const passport = require('passport');

const User = require('../models/User');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.index = async (req, res) => {
	if (req.isAuthenticated()) {

		var loggedInUser = await User.findById(req.user._id);

		res.render('index', {loggedInUser});
	} else {
		res.render('login');
	}
	
}

exports.login = (req, res) => {

	
	passport.authenticate("local")(req, res, async function () {
		try {
			const loggedInUser = await User.findById(req.user._id)
				.populate('roleId')
				.exec()
				.catch(error => {
					console.error('Error fetching user:', error);
					// Handle the error (e.g., return an error response)
				});
			const loggedInUserRole = loggedInUser.roleId.title;
			// const roleRedirectMap = {
			// 	'admin': 'admin',
			// 	'Phone Agent': 'phone-agent'
			// 	// Add more roles
			// };
			// const redirectPath = roleRedirectMap[loggedInUserRole];
			// if (redirectPath) {
			// 	res.redirect(redirectPath);
			// } else {
				res.redirect("/");
			//}
		} catch (error) {
			console.error(error);
			res.redirect("login");
		}

	});

	//if (req.isAuthenticated()) {
	//	return res.render('index');
	//} else {
		
	//}
}

exports.logout = (req, res) => {
	req.logout((err) => {
		if (!err) {
			res.redirect('/');
		}
	});

};