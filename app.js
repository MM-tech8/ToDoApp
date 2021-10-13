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

setupDB();


    // get all Projectboard checked
    app.get('/projectBoard', async(req, res) => {
        const projectBoard = await ProjectBoard.findAll() 
        return res.status(200).json(projectBoard)
    }); 

    // get a specific Projectboard check
    app.get('/projectBoard/:id', async(req, res) => {
        const id = req.params.id
        const projectBoard = await ProjectBoard.findByPk(id)
        return res.status(200).json(projectBoard)
    });

    // create check
    app.post('/dashboard/:id/projectboard', async(req, res) =>{
        
        const {Title} = req.body; 
        const dashboard = await Dashboard.findByPk(req.params.id)
        const board = await dashboard.createProjectBoard({
            Title
        });
        console.log(board)
        res.sendStatus(201).json(board)
    });


// Task

    // create new task in coloumn check
    app.post('/projectBoard/:id/column/:columnid/task', async(req, res) =>{
        const {Title, description, assignedUsers} = req.body;
        await Task.create({Title, description, assignedUsers})
        res.sendStatus(201)
    })

    // Get request check
    app.get('/projectBoard/:id/column/:columnid/task/:taskid', async(req, res) => {
        const taskid = req.params.taskid
        const gettask = await Task.findByPk(taskid)
        return res.status(200).json(gettask)
    });


    // delete task in Col.projectboard check 
    app.delete('/projectBoard/:id/column/:columnid/task/:taskid', async(req, res) =>{
       try{ 
           const task = await Task.findByPk(req.params.taskid)
           console.log(task)
        await task.destroy()
        res.status(200)} 
        catch(error){
            console.error(error)
        }
        }); 
    // edit task in Col.projectboard check
    app.put("/projectBoard/:id/column/:columnId/task/:taskid", async (req, res) => {
        const task = await Task.findByPk(req.params.taskid);
        if (!task) {
            return res.sendStatus(404);
        }
        await task.update(req.body);
        res.sendStatus(200);
    });




// Column
    // get all column within ProjectBoard not done
    app.get('/projectBoard/:id/column', async(req, res) =>{
        const projectBoardid = req.params.id
        const getprojectBoard = await ProjectBoard.findByPK(projectBoardid) 
        return res.status(200).json(getprojectBoard)
    });
    // create column in projectBoard
    app.post('/projectBoard/:id/column', async(req, res) =>{
        const id = req.params.id
        const {Title} = req.body;
        await Column.create(Title)
        res.sendStatus(201)
    })
// get column
    app.get('/projectBoard/:id/column/:columnid', async(req, res) => {
        const columnid = req.params.columnid
        const getcolumn = await Column.findByPk(columnid)
        return res.status(200).json(getcolumn)
    });
    // delete column in projectboard 
     app.delete('/column/:columnId', async(req, res) =>{
        try { 
        const column = await Column.findByPk(req.params.columnId)
        await column.destroy()
        res.status(200)
    } 
        catch(error){
            console.error(error)
        }
        });


    // edit column in projectboard 
     app.put("/projectBoard/:id/column/:columnId", async (req, res) => {
        const column= await Column.findByPk(req.params.columnId);
        if (!column) {
            return res.sendStatus(404);
        }
        await column.update(req.body);
        res.sendStatus(200);
    });


    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });