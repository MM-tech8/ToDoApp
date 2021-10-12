const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");
const ProjectBoard = require("./projectBoard");

class Dashboard extends Model {}

Dashboard.init(
    {

    },
    {
        sequelize,
        modelName:"dashboard",
        timestamps:false
    }
);

module.exports = Dashboard;
