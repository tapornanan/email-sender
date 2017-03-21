
var async = require("async");

module.exports = {

  sendMail: function(_to, _product_name, callback) {
    console.log('Send mail sevice....');

    'use strict';
		const nodemailer = require('nodemailer');
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
		    service: 'gmail',
		    auth: {
		        user: 'pornanan@wishbeer.com',
		        pass: 'unlockO!'
		    }
		});

    var list = '';
    var counter = 1;
    // extract product name.
    async.eachSeries(_product_name, function(each, next_prod){
      list += counter + ". " + each.product_name + '<br>';
      counter++;
      next_prod();
    }, function done(err){
      if (err) {
        console.error(err);
        callback(err);
      }
      else {
        console.log(list);
    		// setup email data with unicode symbols
    		let mailOptions = {
    		    from: '"Pornanan" <pornanan@wishbeer.com>', // sender address
    		    to: _to, // list of receivers
    		    subject: '[WISHSTOCK] Daily products update list.', // Subject line
    		    html: list // html body
    		};

    		// send mail with defined transport object
    		transporter.sendMail(mailOptions, (error, info) => {
    		    if (error) {
              console.error(error);
    	        callback(error);
    		    }
    		    console.log('Message %s sent: %s', info.messageId, info.response);
            callback(null, {message: "Message sent to : " + _to + ' successfully.'});
    		});
      }
    });
  }
};
