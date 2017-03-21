/**
 * MailController
 *
 * @description :: Server-side logic for managing mails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	send: function(req, res) {

		var products = [
			{
				product_name: "Stassen Over Ice Apple Cider - 330ml - 5.4%"
			},
			{
				product_name: "Stassen Over Ice Pear Cider - 330ml - 5.4%"
			}
		];

		var receiver_list = [
			{ email: 'pornanan@wishbeer.com' },
			{ email: 'tapornanan23@gmail.com' }
		];

		async.eachSeries(receiver_list, function(each, next_recev){

			MailService.sendMail(each.email, products, function(err, result){
				if (err) {
					console.error(err);
					// return res.json(err);
				}
				console.log(result);
				next_recev();
				// return res.ok();
			}, function done(err){
				if (err) {
					console.error(err);
				}
				return res.ok();
			});
		});

	}


};
