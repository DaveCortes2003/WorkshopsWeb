const User = require("../models/userModel");

const userPost = async (req, res) => {
    let user = new User();

    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;

    user.username = req.body.username;
    user.password = req.body.password;
    user.description = req.body.description;






    if (user.username && user.password) {
        await bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
            user.password = hash.toString();
            // Store hash in your password DB.
        });
        await user.save()
            .then(() => {
                res.status(201); // CREATED
                res.header({
                    'location': `/api/users/?id=${user.id}`
                });
                res.json(user);
            })
            .catch((err) => {
                res.status(422);
                console.log('error while saving the user', err);
                res.json({
                    error: 'There was an error saving the user'
                });
            });
    } else {
        res.status(422);
        console.log('error while saving the user')
        res.json({
            error: 'No valid data provided for user'
        });
    }
};


const userGet = (req, res) => {

    if (req.query && req.query.id) {
        User.findById(req.query.id)
            .then(user => {
                res.json(user);
            })
            .catch(() => {
                res.status(404);
                console.log('error while queryting the user', err)
                res.json({ error: "user doesnt exist" })
            });
    } else {
        User.find()
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                res.status(422);
                res.json({ "error": err });
            });
    }
};


const userPut = (req, res) => {
    if (req.query && req.query.id) {
        User.findById(req.query.id)
            .then(user => {
                // update the user object (patch)
                /*
                user.name = req.body.name ? req.body.name : user.name;
                user.code = req.body.code ? req.body.code : user.code;
                user.description = req.body.description ? req.body.description : user.description;
                */
                // update the user object (put)
                user.username = req.body.username
                user.password = req.body.password
                user.description = req.body.description

                user.save()
                    .then(user => {
                        res.status(200); // OK
                        res.json(user);
                    })
                    .catch(err => {
                        res.status(422);
                        console.log('error while saving the user', err)
                        res.json({
                            error: 'There was an error saving the user'
                        });
                    })




                    .catch(err => {
                        res.status(404);
                        console.log('error while queryting the teacher', err)
                        res.json({ error: "user doesnt exist" })
                    })

            });
    }
}
const userDelete = (req, res) => {

    if (req.query && req.query.id) {
        User.findByIdAndDelete(req.query.id)
            .then(() => {
                res.status(204);
                res.json({});
            })
            .catch((err) => {
                res.status(404);
                console.log('error while queryting the user', err)
                res.json({ error: "user doesnt exist" })
            });
    }
    else {
        res.status(404);
        res.json({ error: "user doesnt exist" })
    }
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}