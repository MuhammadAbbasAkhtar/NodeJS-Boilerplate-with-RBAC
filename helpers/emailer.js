
const sgMail = require('@sendgrid/mail');
const helper = require('./common')
const config = require('../config/keys')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(mailOptions) {
    try {
        return new Promise((resolve, reject) => {
            sgMail.send(mailOptions, (error, result) => {
                if (error) {
                    console.log("email sending error");
                    helper.prettyLog(error) 
                    return reject(error);
                }
                if(result == "HTTP 202")
                    helper.prettyLog(result, 'send grid email sent successfully')
                return resolve(result);
            });
        });
    } catch (error) {
        helper.prettyLog(error)
    }
}



module.exports = { sendEmail };