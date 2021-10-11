const express = require("express");
const setupDB = require("./setupDB");


const app = express();

const port = 4000;

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});

