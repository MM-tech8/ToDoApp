const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");
const { time, timeStamp } = require("console");

class ProjectBoard extends Model {}

ProjectBoard.init (
    {
        Title: DataTypes.TEXT
    },
    {
        sequelize,
        modelName:"project-board",
        timestamps:false
    }
);

module.exports = ProjectBoard;