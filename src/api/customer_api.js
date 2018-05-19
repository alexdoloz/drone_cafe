const express = require('express');
const { checkSchema } = require('express-validator/check');
const mongoose = require('mongoose');
const clientRouter = express.Router();
const Customer = require('../model/customer');

function generateToken() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

clientRouter.post('/register', (req, res) => {
    // валидацию потом добавлю
    let customer;
    // клиент уже есть (ищем по email) – перезаписываем токен и имя
    Customer.findOne({ email: req.body.email }, (err, customer) => {
        if (err) {
            res.status(500).json({ error: "Server error" });
            return;
        }
        let resultCustomer = customer ? customer : new Customer({});
        resultCustomer.name = req.body.name;
        resultCustomer.email = req.body.email;
        if (!customer) {
            resultCustomer.balance = 100;
            resultCustomer.orders = [];
            resultCustomer.cookie = generateToken();
        }
        resultCustomer.save((err, c) => {
            if (err) {
                res.status(500).json({ error: "Server error" });
                return;
            }
            res.cookie("dc_token", c.cookie);
            res.status(200).json("registered successfully");
        });
    });
});

clientRouter.get('/my_dishes', (req, res) => {

});

clientRouter.get('/me', (req, res) => {

});

clientRouter.get('/menu', (req, res) => {

});

clientRouter.post('/order', (req, res) => {

});

module.exports = clientRouter;