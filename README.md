# NodeJS-Boilerplate
This is a template server with NodeJS using
- Express
- MongoDB
- SendGrid 
- Passport & jsonwebtoken
- Microservices Architecture

This template also includes the user registration module, which has;
- Signup
- Verify Email
- Login
- Reset Password

---

## Setup

1. **install packages** 
    - `npm i`

2. **Start Server** 
    - `npm start` for production
    - `npm run dev` for development

---

## ENV config
> rename *.env.example* to *.env*   "`mv .env.example .env`"

`APP_NAME` : the name of the application. Used when:
- sending registration emails 

`PORT` : server will run on this port

`MONGO_CONN_URL` : mongodb connection url

`production` : Used when :
- when sending emails (depending on this value different url is sent to user for account verification)

`CRYPTR_EMAIL_SECRET` : the user's email is encrypted by this secret. Used when:
- Sending registration emails 

`FROM_EMAIL` : all the emails will be sent using this address

`REGISTRATION_TEMPLATE_ID` : sendgrid template id
- this template is used when sending registration emails

`SENDGRID_API_KEY` : sendgrid api key
- sendgrid is used for sending emails

`LOCAL_IP` : server's local ip
- sendgrid changes url in emails and local server url becomes invalid
- Local ip is set automatically when app is created in `server.js` using `helpers/common.getLocalIP()`

- Used when:
    - sending emails to user

---

## Keys config
> config/keys.js

`JWT_SECRET` : The secret by which the token will be signed

`REFRESH_TOKEN_SECRET` : The secret by which the refresh token will be signed

`REFRESH_TOKEN_LIFE` : Life of the refresh token

`REFRESH_TOKEN_ALGO` : The Algorithm used to sign the refresh token

`tokenExpireTime` : Life of token

`welcome_email_subject` : This will be the subject when sending registration emails

`emailUrl` : This url will be sent in email to the user for verifying on `production`

`emailLocalUrl` : This url will be sent in email to the user for verifying on `development`

`EMAIL_TOKEN_EXPIRY` : Life of email token

`directories` : List of directories used by the server as well as the user.

> Directories will be auto generated when server is started. 

> If you don't want the directories to be auto generated,  comment/remove `createDirectories()` in `config/init.js`

