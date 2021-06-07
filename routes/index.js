const express = require('express');
const auth = require('./auth')
const helper = require('../helpers/common')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
module.exports = app => {

    app.get('/', (req, res) => {
        return helper.sendResponseMsg(res, "Welcome to Node Server", true, 200)
    });

    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{explorer: true}));
    app.use('/api/auth',auth)
}