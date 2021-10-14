const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");


class Dashboard extends Model {}

Dashboard.init(
    {
        Title: DataTypes.STRING,
    },
    {
        sequelize,
        modelName:"dashboard",
        timestamps:false
    }
);

module.exports = Dashboard;
