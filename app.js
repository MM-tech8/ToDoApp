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
app.use(express.static('public'));

const port = 4000;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

// tells page how to handle the data from signup form
  app.post('/signup.html',function(req,res){
    const username = req.body.username;
    const pass = req.body.password
    const admin = req.body.admin
    var htmlData = username + pass + admin;
    res.send(htmlData);
    console.log(htmlData);
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






setupDB();