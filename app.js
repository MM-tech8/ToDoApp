const express = require("express");
const setupDB = require("./setupDB");

const app = express();

const Column = require("./column");
const Dashboard = require("./dashboard");
const ProjectBoard = require("./projectBoard");
const Task = require("./task");
const User = require("./user");
const Admin = require("./admin");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = 4000;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

// makes a new user
app.post("/user", async (req,res) => {
    const { username, password, avatarURL } = req.body;
    await User.create({ username, password, avatarURL});
    res.sendStatus(201);
});

// gets all the users
app.get("/user", async (req,res) => {
    const user = await User.findAll();
    res.send(user);
});

// gets a user by id
app.get("/user/:id", async (req,res) => {
    const user = await User.findByPk(req.params.id);
    res.send(user);
});

// makes a new dashboard
app.post("/user/:id/dashboard", async (req,res) => {
    const user = await User.findByPk(req.params.id);
    const {} = req.body;
    await user.createDashboard({ });
    res.sendStatus(201);
});

// makes a new admin
app.post("/admin", async (req,res) => {
    const { admin } = req.body;
    await Admin.create({ admin });
});

app.get("/public/signup.html", async (req,res) => {
    const { completeForm } = req.body;
    res.send(completeForm);
});

setupDB();