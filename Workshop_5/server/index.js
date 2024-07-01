require('dotenv').config();

const bcrypt = require('bcrypt');
const User = require("./models/userModel.js");

const express = require('express');
const jwt = require("jsonwebtoken");
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

//JWT Creation
app.post("/api/session", function (req, res, next) {
  if (req.body.username && req.body.password) {
    //TODO: validate user in the database

    User.findOne({ username: req.body.username })
      .then(user => {

        bcrypt.compare(req.body.password, user.password, (error, result) => {
          if (result) {
            const payload = {
              data: user,
            }

            const token = jwt.sign(payload, process.env.JWT_KEY, {
              expiresIn: "6h"
            });

            res.status(201).json({
              token
            })
          }
          else {
            res.status(404);
            console.log('error while searching the user')
            res.json({ error: "Check your credentials" })
          }
        });

      })
      .catch((error) => {
        res.status(404);
        console.log('error while searching the user', error)
        res.json({ error: "Check your credentials" })
      });


  } else {
    next();
  }
});

// JWT Validation
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    const authToken = req.headers["authorization"];
    try {
      jwt.verify(authToken, process.env.JWT_KEY, (err, decodedToken) => {
        if (err || !decodedToken) {
          res.status(401);
          res.json({
            error: "Unauthorized "
          });
        }

        // here I can validate if the token was created from a different user agent or from a different IP
        //console.log('Payload:', decodedToken);
        next();
      });
    } catch (e) {
      res.status(401);
      res.send({
        error: "Unauthorized "
      });
    }

  } else {
    res.status(401);
    res.send({
      error: "Unauthorized "
    });
  }
});


const { teacherGet, teacherPost, teacherPatch, teacherDelete } = require('./controllers/teacherController');
const { majorGet, majorPost, majorPut, majorDelete } = require('./controllers/majorController');
const { userGet, userPost, userPut, userDelete } = require('./controllers/userController');



// listen to the task request Teachers:
app.post("/api/teachers", teacherPost);
app.get("/api/teachers/", teacherGet);
// app.patch("/api/teachers", teacherPatch);
// app.put("/api/teachers", teacherPatch);
// app.delete("/api/teachers", teacherDelete);


// listen to the task request Majors:
app.post("/api/majors", majorPost);
app.get("/api/majors", majorGet);
app.put("/api/majors", majorPut);
app.delete("/api/majors", majorDelete);


app.post("/api/users", userPost);
app.get("/api/users", userGet);
app.put("/api/users", userPut);
app.delete("/api/users", userDelete);

app.listen(3001, () => console.log(`Example app listening on port 3001!`))
