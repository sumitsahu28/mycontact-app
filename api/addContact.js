var db = require('../mongodb');

add = (req, res, next) => {
	console.log('hello');
	console.log(req.body);
	contactRes = {
		name: req.body.name,
		email: req.body.email,
        number: req.body.number,
		address: req.body.address
	}
	// var contact = new db.Contactsdb({
	// 				"name": contactRes.name,
	// 				"email": contactRes.email,
    //                 "number": contactRes.number,
    //                 "address": contactRes.address
	// 			});
	// 			console.log(contact);
	// 			contact.save();
	// 			res.send({ 'status': 'added successfully' });
     db.Contactsdb.findOne({ number: contactRes.number })
		.then(function (response) {
			if (!response) {
				var contact = new db.Contactsdb({
					"admin": req.session.number,
					"name": contactRes.name,
					"email": contactRes.email,
                    "number": contactRes.number,
                    "address": contactRes.address
				});
				contact.save()
					.then(function (response) {
						res.json({ 'status': 'added successfully' })
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
	add
}