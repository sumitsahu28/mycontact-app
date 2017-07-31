var db = require('../mongodb');

authenticate = (req, res, next) => {

	db.Accounts.findOne({
		number: req.body.number, password: req.body.password
	}, function (err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {


				req.session.number = req.body.number;
				req.session.isLogged = true;
				console.log('inside auth', req.session.number);
				
				// return the information including token as JSON
				res.json({
					success: true,
					message: 'user logged in!',
					isLogged : req.session.isLogged
		
				});
			}

		}

	});
}

module.exports = {
	authenticate
}