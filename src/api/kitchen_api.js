const express = require('express');
const mongoose = require('mongoose');
const kitchenRouter = express.Router();

kitchenRouter.get('/orders', (req, res) => {

});

kitchenRouter.post('/start_order/:id', (req, res) => {

});

kitchenRouter.post('/finish_order/:id', (req, res) => {
    
});

module.exports = kitchenRouter;