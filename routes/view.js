var express = require('express');
var router = express.Router();

var auth = function (req, res, next) {
	if (req.session.number && req.session.isLogged)
		return next();
	else
		return res.redirect('/');
};



router.get('/home', auth, function (req, res, next) {
	if (req.session.isLogged) {
		res.render('home', { title: ' Your Contacts', session: req.session.number })
	}
});


router.get('/', function (req, res, next) {
	res.render('login', { title: 'MyContactApp' });
});

router.get('/logout', auth, function (req, res, next) {
	req.session.isLogged = false,
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;

