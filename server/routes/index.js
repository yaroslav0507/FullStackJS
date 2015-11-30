'use strict';

global.express       = require('express');
global.router        = express.Router();
global.mongoose      = require('mongoose');

global.jwt           = require('express-jwt');
global.auth          = jwt({secret: process.env.JWT_CERT, userProperty: 'payload'});

var endpoints = [
 './items',
 './users/users-auth',
 './users/users-info',
 './users/change-username',
 './users/change-password',
 './users/change-image',
 './users/update-contact-info',
 './categories',
 './file-upload',
 './cart/add-to-cart',
 './cart/delete-from-cart',
 './cart/delete-all-from-cart',
 './cart/get-cart',
 './cart/update-cart',
 './orders/checkout',
 './orders/get-orders',
 './orders/get-user-orders',
 './orders/delete-order'
];

endpoints.forEach(function(endpoint){
   require(endpoint);
});

require('./mailer/mail-transporter');
require('./mailer/send-mail');

module.exports = router;