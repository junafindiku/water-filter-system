const User = require('../models/User');

makeSureIs = function(role) {
    return async (req, res, next) => {
        if (req.isAuthenticated()) {
            await User.findById(req.user._id)
                .populate('roleId')
                .exec()
                .then(u => {
                    const r = u.roleId.title;
                    if (r == role) {
                        return next();
                    } else {
                        res.render('unauthorized');
                    }
                });
        }
    }
}

module.exports = {makeSureIs};