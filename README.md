# NodeJS-Boilerplate with RBAC

This is a template server with NodeJS using
- Express
- MongoDB
- SendGrid 
- Passport & jsonwebtoken
- Microservices Architecture

This template implements Role & Permission based Access Control

---

### Setup

Clone the project

```bash
  git clone https://github.com/MuhammadAbbasAkhtar/NodeJS-Boilerplate-with-RBAC
```

Go to the project directory

```bash
  cd NodeJS-Boilerplate-with-RBAC
```

Install dependencies

```bash
  npm install
```

Start the server
- `npm start` for production
- `npm run dev` for development

---

### Environment variables

To run this project, you will need to add the following environment variables to your .env file

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

### Keys config
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

---

### API Reference

#### After starting server, visit `/api/docs`

---

### How to extend?
1.  Create a new route in `routes/index.js`
2.  If this route requires user to be logged in then add `authenticate` middleware
3.  If this route accesses a resource then make a method in the relevant controller to set the resource to the request object 
4.  If you want to give complete access to one role then 
    - Add 
        - `authRole(role)` where role is the key from `rbac/roles` eg: `ROLE.USER`
    - Else
        - add the middleware that checks for the specific permission defined in `rbac/permissions`
5.  Add the controller method

---

### Predefined roles
 - admin
 - moderator
 - user

---

### Creating roles
- Add the `key:value` of the role in the `ROLE` object at `rbac/roles`

---

### Creating permissions
1. In `rbac/permissions`, create a new method that takes minimum 2 parameters; `user` and the `resource`.
2. Write the permission logic.
3. Add this method in `module.exports`

---

### Creating a middleware to check for permissions
1. Create a method in the relevant controller that calls the permission you just created.
2. Write the checking logic 
3. Add this method in `module.exports`

---


### Feedback

If you have any feedback, please reach out to me at m.abbas.akhtar@ampfolios.com
