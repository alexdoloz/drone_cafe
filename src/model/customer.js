// ------ КЛИЕНТ ------ 

const mongoose = require('mongoose');

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

customerSchema.methods.initialDeposit = function(callback) {
    this.balance = 100;
    this.save(callback);
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;