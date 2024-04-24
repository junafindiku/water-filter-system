const passport = require('passport');

const User = require('../models/User');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.index = async (req, res) => {
	if (!req.isAuthenticated()) {
		res.render('login');
	}
	
}

exports.login = (req, res) => {

	
	// passport.authenticate("local")(req, res, async function () {
	// 	try {
	// 		const loggedInUser = await User.findById(req.user._id)
	// 			.populate('roleId')
	// 			.exec()
	// 			.catch(error => {
	// 				console.error('Error fetching user:', error);
	// 			});
	// 		const loggedInUserRole = loggedInUser.roleId.title;
	// 		const roleRedirectMap = {
	// 			'admin': 'admin',
	// 			'sales agent': 'sales-agent'
	// 		};
	// 		const redirectPath = roleRedirectMap[loggedInUserRole];
	// 		if (redirectPath) {
	// 			res.redirect(redirectPath);
	// 		} else {
	// 			res.redirect("/");
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 		res.redirect("login");
	// 	}

	// });

  passport.authenticate("local")(req, res, async function (){
    try{
      const loggedInUser = await User.findById(req.user._id)
      .populate('roleId')
      .exec()
      .catch(error=>{
        console.error('Error fetching user:', error);
        throw new Error('Error fetching user');
      });
      
      if(loggedInUser){
        res.status(200).json({
          status: true,
          message: "User logged in successfully"
        })
      }else{
        res.status(404).json({
          status: false,
          message: "User not found"
        })
      }
    }catch(error){
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Internal server error"
      })
    }
  })
}

exports.logout = (req, res) => {
	req.logout((err) => {
		if (!err) {
			res.redirect('/');
		}
	});

};