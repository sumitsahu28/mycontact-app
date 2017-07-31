var express = require('express');
var router = express.Router();

var auth = function(req, res, next) {
  if (req.session && req.session.isLogged)
    return next();
  else
    return res.json({ status: 'FAILED', message: 'Please login.' });

};


var addContact = require('../api/addContact')
var listContact = require('../api/listContact')
var deleteContact = require('../api/deleteContact')
var editContact = require('../api/editContact')
var authenticate = require('../api/authenticate')
var addUser = require('../api/addUser')
var logout = require('../api/logout')



router.post('/add', addContact.add)
router.post('/list', listContact.list)
router.post('/delete', deleteContact.del)
router.post('/edit', editContact.edit)
router.post('/authenticate', authenticate.authenticate)
router.post('/adduser', addUser.addUser)
router.post('/logout',logout.logout)



module.exports = router;
