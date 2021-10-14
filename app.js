const express = require("express");
const setupDB = require("./setupDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const app = express();

const Column = require("./column");
const Dashboard = require("./dashboard");
const ProjectBoard = require("./projectBoard");
const Task = require("./task");
const User = require("./user");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


//handlebars setup
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

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
        const emailAvaliabilityCheck = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        let email;
        if (emailAvaliabilityCheck == null) {
            email = req.body.email;
            const password = hashedPassword;
            const avatarURL = req.body.avatarURL;
            const admin = req.body.admin;
            const username = req.body.username;
            await User.create({ username, password, avatarURL, email, admin });
            res.sendStatus(201);
        }
        else res.redirect("/signup.html")

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

// delete a user
app.delete("/user/:id/delete", async (req,res) => {
    const user = await User.findByPk(req.params.id);
    if(!user){
        return res.sendStatus(404);
    }

    await user.destroy();
    res.sendStatus(200);
});

// makes a new dashboard
app.post("/user/:id/dashboard", async (req,res) => {
    const user = await User.findByPk(req.params.id);
    const {} = req.body;
    await user.createDashboard({ });
    res.sendStatus(201);
});





// forget password

const JWT_SECRET = "very secret secret"


app.get("/forgot-password", (req,res,next) => {
    res.render("forgot-password")
})

//app.post("/forgot-password", (req,res,next) =>{
   // const {email} = req.body;
   // const userEmail = await User.findByPk(email)
   // const userPassword = await User.findByPk(userEmail)

   // if (email !== userEmail){
   //     res.send("User is not registered")
   //     return;
   // }
    //user exists so a one time link is created for time limit of 15 mins
 //   const secret = JWT_SECRET + userPassword
//})

app.get("/reset-password", (req,res,next) => {

})

app.post("/reset-password", (req,res,next) => {

})





setupDB();