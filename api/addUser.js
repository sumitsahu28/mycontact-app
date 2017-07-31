var db = require('../mongodb');

addUser = (req, res, next) => {

	contactRes = {
		number: req.body.number,
		password: req.body.password
	}


	db.Accounts.findOne({ number: contactRes.number })
		.then(function (response) {
			if (!response) {
				var contact = new db.Accounts({
					"password": contactRes.password,
					"number": contactRes.number
				});
				contact.save()
					.then(function (response) {
						console.log(response);
						res.send({ 'status': 'added successfully' })
					})
					.catch(function (e) {
						res.send({ 'status': 'failure', Error: e });
					});
			}
			else {
				res.send({ 'status': 'contact already exist' })
			}
		})
		.catch(function (e) {
			res.send({ 'status': e })
		})
};

module.exports = {
	addUser
}