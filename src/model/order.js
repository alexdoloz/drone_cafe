//------- ЗАКАЗ --------

const mongoose = require('mongoose');
const OrderState = require('./order_state');
const menu = require('./menu.json');

const orderSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    menuId: Number,
    state: {
        type: String,
        index: false,
        enum: Object.keys(OrderState)
    }
});

orderSchema.methods.getMenuItem = function () {
    return menu[this.menuId];
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;