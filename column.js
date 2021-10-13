const sequelize = require("./db");
const { Model, DataTypes } = require("sequelize");

class Column extends Model {};

Column.init (
    {
      Title: DataTypes.STRING,  
    },
    {
        sequelize,
        modelName:"column",
        timestamps:false
    }
);

module.exports = Column;