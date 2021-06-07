const express = require('express');
const {check} = require('express-validator');
const Auth = require('../controllers/authController');
const router = express.Router();
const validate = require('../middlewares/validate');

const jwt = require('../middlewares/jwt')


router.put('/register', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('firstName').not().isEmpty().withMessage('Your first name is required'),
    check('lastName').not().isEmpty().withMessage('Your last name is required'),
    check('mobile_number').not().isEmpty().withMessage('Your mobile number is required')
], validate, Auth.register);

router.post('/login',[
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
], validate, Auth.login)

router.get('/verify/:token', Auth.verify);

router.post('/resend', [
    check('email').isEmail().withMessage('Enter a valid email address'),
], validate, Auth.resendToken);

// router.post('/checkemail', Auth.checkemail)
 
// router.post('/refresh', authenticate, Auth.refresh)

router.post('/refresh', jwt.validateToken, Auth.refresh)
router.get('/validate-token', jwt.validateToken, (req, res) => res.status(200).json({success:true}))

module.exports = router; 