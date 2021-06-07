const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/keys');
const helper = require('../helpers/common')
const opts = {
    // "fromAuthHeaderAsBearerToken()" creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
};
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) return done(null, user);
                    return done(null, false);
                })
                .catch(err => {
                    return done(err, false, {message: 'Server Error'});
                });
        })
    );
};


module.exports.checkToken = (req, res, next) => {   
    let token = req.headers['authorization']; // Express headers are auto converted to lowercase

    if (token.startsWith('Bearer ')) // Remove Bearer from string
      token = token.slice(7, token.length);
    
    if (token) 
        //console.log(token);
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) return helper.sendResponse(res,400,{err,success:false});
            
            else {
                req.decoded = decoded;
                return helper.sendResponse(res,{success:true});
                //  next();
            }
        })(req,res,next)
    else 
        return helper.sendResponse(res,400,{success:false});
        
    
};
module.exports.checkRefreshToken = (token, res) => {
    if(!token) return helper.sendResponse(res,400,{success:false, message:'No token provided'});
    return jwt.verify(token.refreshToken, config.REFRESH_TOKEN_SECRET, (err, dec) => {
        if (err) {
            const expired = err.expiredAt ? ` at ${err.expiredAt}`:''
            helper.sendResponse(res, {success:false, message:`refresh token check failed with message: ${err.message} ${expired}`})
            return false
        } 
        return true;
    })
}

module.exports.validateToken = (req, res, next) => {
    if(!req.headers.authorization) return helper.sendResponse(res,400,{success:false, message:'No token provided'});
    const token = req.headers.authorization.split('Bearer ')[1]
    jwt.verify(token, config.JWT_SECRET, err => {
        if (err) return helper.sendResponse(res,400,{success:false, message:'Invalid Token'});
        // helper.sendResponse(res,{success:true}); 
        next()
    })
}
module.exports.validateRefreshToken = (req, res, next) => {
    if(!req.headers.authorization) return helper.sendResponse(res,400,{success:false, message:'No token provided'});
    const token = helper.decodeToken(req).refreshToken

    if(!token) return helper.sendResponse(res,400,{success:false, message:'Invalid Token'});
    jwt.verify(token, config.REFRESH_TOKEN_SECRET, err => {
        if (err) helper.sendResponse(res,400,{success:false});
        next()
    })
}