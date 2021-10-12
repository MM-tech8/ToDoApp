const sequelize = require("./db");

const User = require("./user");
const Column = require("./column");
const ProjectBoard = require("./projectBoard");
const Task = require("./task")
const Dashboard = require("./dashboard");

async function setupDB() {
    User.hasOne(Dashboard);
    Dashboard.belongsTo(User);

    Dashboard.hasMany(ProjectBoard);
    ProjectBoard.belongsTo(Dashboard);

    ProjectBoard.hasMany(Column);
    Column.belongsTo(ProjectBoard);

    Column.hasMany(Task);
    Task.belongsTo(Column);

    await sequelize.sync();
};

module.exports = setupDB;
