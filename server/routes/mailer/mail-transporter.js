'use strict';

var Orders = mongoose.model('Order');

var nodemailer = require("nodemailer");

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'styleworks0507@gmail.com',
        pass: 'Styleworks777'
    }
});


module.exports = transporter;
