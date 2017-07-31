var mongoose = require('mongoose')
mongoose.Promise= require('bluebird')
//mongoose.connect('mongodb://localhost:27017/contactsdb')
mongoose.connect('mongodb://localhost:27017/contactsdb', function(err) {
    if (err) 
        throw err;
    console.log('mongodb connected');
});
var schema = new mongoose.Schema({
    admin: String,
	 name : String,
    email:String ,
    number:String,
    address:String
});

var schema1 = new mongoose.Schema({
    password: String,
    number: String
});


var Contactsdb = mongoose.model('Contactsdb', schema);
var Accounts = mongoose.model('Accounts', schema1);

module.exports = {
    Contactsdb,
    Accounts
}