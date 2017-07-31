var db = require('../mongodb');

list = (req, res, next) => {

	db.Contactsdb.find({ "admin": req.session.number })
		.then((response) => {

			if (response) {
				res.json({ status: "Success list", result: response })
			}
			else {
				res.json({ status: "no list" })
			}
		}).catch(function (e) {
			console.log('error')
		})

}

module.exports = {
	list
}