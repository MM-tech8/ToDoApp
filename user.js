const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class User extends Model{};

User.init(
    {
        email: {type: DataTypes.TEXT, primaryKey: true},
        username: DataTypes.TEXT,
        password: DataTypes.TEXT,
        avatarURL: DataTypes.TEXT,
        admin : DataTypes.TEXT
        
    },
    {
        sequelize,
        modelName: "user",
        timestamps: false,
    }
);

module.exports = User;