const bcrypt = require("bcrypt");
const db = require("./db.js");
const saltRounds = 10;

var password = "askldjalks223!";
var username = "max14";

bcrypt.hash(password, saltRounds, function(err, hash) {
    let values = [hash, username]

    db.query(statement, values, function(err,res) {
        if(err) throw err;
        else{
            console.log("password has been stored!");
        }
    });
});