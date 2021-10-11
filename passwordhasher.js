const bcrypt = require("bcrypt");
const db = require("./db.js");
const saltRounds = 10;

var password = "askldjalks223!";
var username = "max14";

var statement = "select password from user_table where username = $1";





bcrypt.hash(password, saltRounds, function(err, hash) {
    let values = [hash, username]
});