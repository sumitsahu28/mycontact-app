var db = require('../mongodb');

del = (req, res, next) => {
	name = req.body.name;
	email = req.body.email;
    number = req.body.number;
    address = req.body.address;
	db.Contactsdb.findOneAndRemove({ admin: req.session.number }).then(function () {
		res.json({ status: "contact deleted" })
	})
}

module.exports = {
	del
}

//name: name, email: email, , address: address