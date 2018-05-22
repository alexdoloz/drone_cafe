const express = require('express');
const { checkSchema } = require('express-validator/check');
const mongoose = require('mongoose');
const clientRouter = express.Router();
const Customer = require('../model/customer');
const Order = require('../model/order');
const menu = require('../model/menu.json');
const authMW = require('./auth_middleware');

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

clientRouter.get('/orders', authMW, (req, res) => {
    const { customer } = req;
    Order.find({ customer: customer }, "id menuId state", (err, orders) => {
        if (err) {
            res.status(500).send("Server error");
            return;
        }
        res.json(orders);
    });
});

clientRouter.get('/me', authMW, (req, res) => {
    const { customer } = req;
    res.json({
        name: customer.name,
        email: customer.email,
        balance: customer.balance
    });
});

clientRouter.get('/menu', (req, res) => {
    res.json(menu);
});

clientRouter.post('/order', authMW, (req, res) => {
    // TODO: добавить валидацию
    const { menuId } = req.body;
    req.customer.makeOrder(menuId, (err) => {
        if (err) {
            res.status(200).json({ error: err.toString() });
            return;
        }
        res.status(200).send("order success");
    });
});

module.exports = clientRouter;