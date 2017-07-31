var db = require('../mongodb');

edit = (req, res, next) => {

	resp = {
		name: req.body.name,
		email: req.body.email,
        number: req.body.number,
        address: req.body.address
		
	}
	var oldnum = req.body.oldnumb;
	console.log('inside edit',resp);
	db.Contactsdb.findOneAndUpdate({ number: oldnum },resp)
		.then(function (response) {
			if (response) {
				res.json({ msg: "user is edited" });
			}
			else {
				res.json({ msg: "edit failed" });
			}
		})

};

module.exports = {
	edit
}