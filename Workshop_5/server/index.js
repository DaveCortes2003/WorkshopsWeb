require('dotenv').config();

const express = require('express');
const app = express();
const mongoString = process.env.DATABASE_URL;
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(mongoString);

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
const { majorGet, majorPost, majorPut, majorDelete } = require('./controllers/majorController');



// listen to the task request Teachers:
app.post("/api/teachers", teacherPost);
app.get("/api/teachers/",teacherGet);
// app.patch("/api/teachers", teacherPatch);
// app.put("/api/teachers", teacherPatch);
// app.delete("/api/teachers", teacherDelete);


// listen to the task request Majors:
app.post("/api/majors", majorPost);
app.get("/api/majors/",majorGet);
app.put("/api/majors", majorPut);
app.delete("/api/majors/",majorDelete);

app.listen(3001, () => console.log(`Example app listening on port 3001!`))
