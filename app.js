const express = require("express");
const setupDB = require("./setupDB");
const bcrypt = require("bcrypt");

const app = express();

const Column = require("./column");
const Dashboard = require("./dashboard");
const ProjectBoard = require("./projectBoard");
const Task = require("./task");
const User = require("./user");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const port = 4000;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

app.get("/", (req, res) => {
    res.redirect("/login.html")
})

// tells page how to handle the data from signup form
// makes a new user
app.post("/signup.html", async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const usernameAvaliabilityCheck = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        let username;
        if (usernameAvaliabilityCheck == null) {
             username = req.body.username;
        }
        else res.redirect("/signup.html")

        const password = hashedPassword;
        const avatarURL = req.body.avatarURL;
        const admin = req.body.admin;
        await User.create({ username, password, avatarURL, admin});
        res.sendStatus(201);
    }
    catch {
        res.status(500).send();
    }
});

// login 
app.post("/login.html", async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (user == null) {
        return res.status(400).send('username or password incorrect')
    }
    try{
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.redirect("/dashboard.html");
        }
        else {
            res.send('username or password incorrect')
        }
    }
    catch{
        res.status(500).send()
    }
})


























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