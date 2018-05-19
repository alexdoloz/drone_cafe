const express = require('express');
const apiRouter = express.Router();
const customerRouter = require('./customer_api');
const kitchenRouter = require('./kitchen_api');

apiRouter.use('/', customerRouter);
apiRouter.use('/kitchen', kitchenRouter);

module.exports = apiRouter;