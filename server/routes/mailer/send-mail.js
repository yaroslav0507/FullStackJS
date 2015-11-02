'use strict';

var transporter = require('./mail-transporter');

router.post('/send-mail', function(req, res){

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'E-commerce NodeJS Store', // sender address
        to: 'yaroslav0507@gmail.com', // list of receivers
        subject: 'Hello ?', // Subject line
        text: 'Hello world ?', // plaintext body
        html: '<b>Hello world ?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
});

