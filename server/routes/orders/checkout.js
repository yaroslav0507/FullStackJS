'use strict';

var transporter = require('../mailer/mail-transporter');
var Order = mongoose.model('Order');

router.post('/checkout/', function (req, res, next) {

    var order = new Order({
        cart: req.body.cart,
        customer: req.body.customer
    });

    order.save(function(err, order){
        if(err){ return next(err) }
        res.json(order);
        return order;
    }).then(function(order){
        sendCheckoutEmail(order);
    });

});

/*
* Send checkout details by e-mail.
*/
function sendCheckoutEmail(order){

    var currency = "$",
        orderTemplate = '',
        rowStyle = 'style="border-bottom: 1px solid #eee; padding: 5px;" ';

    /*Generation of order list*/
    (function(){
        order.cart[0].items.forEach(function(item, index){
            index += 1;

            orderTemplate +=
                '<tr>' +
                    '<td ' + rowStyle + '>' + index + '</td>' +
                    '<td ' + rowStyle + 'align="left">' + item.title + '</td>' +
                    '<td ' + rowStyle + '>' + currency + item.price + '</td>' +
                    '<td ' + rowStyle + '>' + item.qty + '</td>' +
                    '<td ' + rowStyle + '>' + currency + item.total + '</td>' +
                '</tr>';
        });
    })();

    /*HTML Mail Template*/
    var mailBody = [
        '<div>',
            '<b>Hello ' + order.customer[0].name + '</b>.' + '\n',
            'Thanks for your order: ',
            '<table width="600px" cellpadding="0" cellspacing="0">',
                '<thead align="center">',
                    '<tr height="40"></tr>',
                    '<tr>',
                        '<th ' + rowStyle + '>#</th>',
                        '<th ' + rowStyle + 'align="left">Item</th>',
                        '<th ' + rowStyle + '>Price</th>',
                        '<th ' + rowStyle + '>Quantity</th>',
                        '<th ' + rowStyle + '>Total</th>',
                    '</tr>',
                '</thead>',
                '<tbody align="center">',
                    orderTemplate,
                    '<tr height="40"></tr>',
                    '<tr>',
                        '<td></td>',
                        '<td></td>',
                        '<td></td>',
                        '<td align="right"><b>Grand total: </b></td>',
                        '<td ' + rowStyle + '>' + currency + order.cart[0].total + '</td>',
                    '</tr>',
                    '<tr height="40"></tr>',
                '</tbody>',
            '</table>',
            'Our manager will contact you by the phone: ',
            '<b>' + order.customer[0].phone + '</b>',
        '<div>'
    ].join(' ');

    var mailOptions = {
        from: 'E-commerce NodeJS Store', // sender address
        to: order.customer[0].email, // list of receivers
        subject: 'Thanks for your order', // Subject line
        html: mailBody
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}



