const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const User = require("./user")

class Admin extends User {}

Admin.init(
    {
        admin:DataTypes.BOOLEAN
    },
    {
        sequelize,
        modelName:"admin",
        timestamps:false,
    }
);

module.exports = Admin;