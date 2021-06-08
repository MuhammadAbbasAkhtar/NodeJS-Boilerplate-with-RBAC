const express = require('express');
const auth = require('./auth')
const user = require('./user')
const admin = require('./admin')
const moderator = require('./moderator')
const project = require('./project')
const helper = require('../helpers/common')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { authRole } = require('../middlewares/role')
const authenticate = require('../middlewares/authenticate')
const { ROLE } = require('../rbac/roles')
module.exports = app => {

    app.get('/', (req, res) => {
        return helper.sendResponseMsg(res, "Welcome to Node Server", true, 200)
    });

    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{explorer: true}));
    app.use('/api/auth',auth)
    app.use('/api/user', authenticate, authRole(ROLE.USER), user)
    app.use('/api/moderator', authenticate, authRole(ROLE.MODERATOR), moderator)
    app.use('/api/admin', authenticate, authRole(ROLE.ADMIN), admin)
    app.use('/api/project', authenticate, project)

}