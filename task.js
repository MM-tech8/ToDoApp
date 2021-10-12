const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Task extends Model {}

Task.init (
    {
        description : DataTypes.TEXT,
        assignedUsers: DataTypes.ARRAY(DataTypes.TEXT) 
    },
    {
        sequelize,
        modelName:"task",
        timestamps:false
    }
);

module.exports = Task;