const User = require('../models/User');

/**
 * @param {String} roleTitle
 */
makeSureIs = function(roleTitle) {
    return async (req, res, next) => {
        if (req.isAuthenticated()) {
            await User.findById(req.user._id)
                .populate('roleId')
                .exec()
                .then(u => {
                    const r = u.roleId.title;
                    if (r == roleTitle) {
                        return next();
                    } else {
                        res.render('unauthorized');
                    }
                });
        } else {
            res.redirect("/");
        }
    }
}

module.exports = {makeSureIs};