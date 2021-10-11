const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class User extends Model{};

User.init(
    {
        username: DataTypes.TEXT,
        password: DataTypes.TEXT,
        avatarURL: DataTypes.TEXT,
    },
    {
        sequelize,
        modelName: "users",
        timestamps: false,
    }
);

module.exports = User;