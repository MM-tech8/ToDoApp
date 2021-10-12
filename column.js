const sequelize = require("./db");
const { Model } = require("sequelize");

class Column extends Model {};

Column.init (
    {
        
    },
    {
        sequelize,
        modelName:"column",
        timestamps:false
    }
);

module.exports = Column;