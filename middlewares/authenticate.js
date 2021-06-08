const passport = require("passport");
const helper = require('../helpers/common')
module.exports = (req, res, next) => {
    passport.authenticate('jwt', function(err, user, info) {

        if (err) return next(err);

        if (!user) return helper.sendResponse(res,403,{error: "Unauthorized Access - No Token Provided!"})

        req.user = user;
        //req.locals.loggedInUser = user;
        next();

    })(req, res, next);
};
const jwt = require('jsonwebtoken');

