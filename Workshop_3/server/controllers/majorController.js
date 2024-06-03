const Major = require("../models/majorModel");

/**
 * Creates a teacher
 *
 * @param {*} req
 * @param {*} res
 */

const majorPost = (req, res) => {
    let major = new Major();

    major.name = req.body.name;
    major.code = req.body.code;
    major.description = req.body.description;

    if (major.name && major.code) {
        major.save()
            .then(() => {
                res.status(201); // CREATED
                res.header({
                    'location': `/api/majors/?id=${major.id}`
                });
                res.json(major);
            })
            .catch((err) => {
                res.status(422);
                console.log('error while saving the major', err);
                res.json({
                    error: 'There was an error saving the major'
                });
            });
    } else {
        res.status(422);
        console.log('error while saving the major')
        res.json({
            error: 'No valid data provided for major'
        });
    }
};


const majorGet = (req, res) => {

    if (req.query && req.query.id) {
        Major.findById(req.query.id)
            .then(major => {
                res.json(major);
            })
            .catch(() => {
                res.status(404);
                console.log('error while queryting the major', err)
                res.json({ error: "major doesnt exist" })
            });
    } else {
        Major.find()
            .then(majors => {
                res.json(majors);
            })
            .catch(err => {
                res.status(422);
                res.json({ "error": err });
            });
    }
};


const majorPatch = (req, res) => {
    // get teacher by id
    if (req.query && req.query.id) {
        Teacher.findById(req.query.id, function (err, teacher) {
            if (err) {
                res.status(404);
                console.log('error while queryting the teacher', err)
                res.json({ error: "Teacher doesnt exist" })
            }

            // update the teacher object (patch)
            teacher.first_name = req.body.first_name ? req.body.first_name : teacher.first_name;
            teacher.last_name = req.body.last_name ? req.body.last_name : teacher.last_name;
            // update the teacher object (put)
            // teacher.title = req.body.title
            // teacher.detail = req.body.detail

            teacher.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the teacher', err)
                    res.json({
                        error: 'There was an error saving the teacher'
                    });
                }
                res.status(200); // OK
                res.json(teacher);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "Teacher doesnt exist" })
    }
};


const majorDelete = (req, res) => {

    if (req.query && req.query.id) {
        Major.findByIdAndDelete(req.query.id)
            .then(major => {
                res.status(204);
                res.json({});
            })
            .catch((err) => {
                res.status(404);
                console.log('error while queryting the major', err)
                res.json({ error: "Major doesnt exist" })
            });
    }
    else {
        res.status(404);
        res.json({ error: "Major doesnt exist" })
    }
};

module.exports = {
    majorGet,
    majorPost,
    majorPatch,
    majorDelete
}