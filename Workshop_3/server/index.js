const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://davecortes:gamerdeivy@workshop1.2jqozfw.mongodb.net/testDatabase");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

const { teacherGet, teacherPost, teacherPatch, teacherDelete } = require('./controllers/teacherController');


// listen to the task request
app.post("/api/teachers", teacherPost);
app.get("/api/teachers/",teacherGet);
// app.patch("/api/teachers", teacherPatch);
// app.put("/api/teachers", teacherPatch);
// app.delete("/api/teachers", teacherDelete);


app.listen(3001, () => console.log(`Example app listening on port 3001!`))
