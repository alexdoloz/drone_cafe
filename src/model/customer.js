// ------ КЛИЕНТ ------ 

const mongoose = require('mongoose');
const menu = require('./menu.js');
const Order = require('./order');
const OrderState = require('./order_state');

const customerSchema = mongoose.Schema({
    name: String,
    email: String,
    cookie: String,
    balance: Number,
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]    
});

customerSchema.methods.updateBalance = function(amount, callback) {
    const amountNumber = Number(amount);
    if (this.balance + amountNumber < 0) {
        callback(new Error(`Not enough money`));
        return;
    }
    this.balance += amountNumber;
    this.save(callback);
};

customerSchema.methods.isEnoughMoney = function(amount) {
    return this.balance + amount >= 0;
};

customerSchema.methods.initialDeposit = function(callback) {
    this.balance = 100;
    this.save(callback);
};

customerSchema.methods.makeOrder = function(menuId, callback) {
    const menuItem = menu[menuId];
    if (!this.isEnoughMoney(menuItem.price)) {
        callback(new Error(`Not enough money`));
        return;
    }
    const order = new Order();
    order.customer = this.id;
    order.menuId = menuId;
    order.state = OrderState.ORDERED;
    this.orders.push(order);
    this.save((err) => {
        if (err) {
            callback(err);
            return;
        }
        order.save(callback);
    });
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;