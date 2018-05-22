const Customer = require('../model/customer');

module.exports = (req, res, next) => {
    if (!req.cookies || !req.cookies.dc_token) {
        res.status(404).json({ error: "Customer not logged in" });
        return;
    }
    Customer.findOne({ cookie: req.cookies.dc_token }, (err, customer) => {
        if (err) {
            res.status(500).json({ error: "Server error" });
            return;
        }
        if (!customer) {
            res.status(404).json({ error: "Customer not found" });
            return;
        }
        req.customer = customer;
        next();
    })
};