const Major = require("../models/majorModel");

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
    }
    else {

        if (req.query && req.query.name) {
            let order = null;
            if (req.query.sort === "asc") {
                order = { name: 1 };
            }
            else if (req.query.sort === "desc") {
                order = { name: -1 };
            }

            Major.find({ "name": { "$regex": req.query.name, "$options": "i" } }).sort(order)
                .then(majors => {
                    res.status(200);
                    res.json(majors);
                })
                .catch(err => {
                    res.status(422);
                    res.json({ "error": err });
                });
        }

        else {
            Major.find()
                .then(majors => {
                    res.status(200);
                    res.json(majors);
                })
                .catch(err => {
                    res.status(422);
                    res.json({ "error": err });
                });
        }

        /*
        Major.find()
            .then(majors => {
                if(req.query && req.query.name){
                    majors = majors.filter(major => major.name.toLowerCase().includes(req.query.name.toLowerCase()))
                    if(req.query.sort){
                        if(req.query.sort.toLowerCase() === "asc"){
                            majors = majors.sort((a,b)=> (a.name > b.name ? 1 : -1))
                        }
                        else if(req.query.sort.toLowerCase() === "desc"){
                            majors = majors.sort((a,b)=> (a.name < b.name ? 1 : -1))
                        }
                    }
                }
                res.json(majors);
            })
            .catch(err => {
                res.status(422);
                res.json({ "error": err });
            });
        */

    }
};


const majorPut = (req, res) => {
    if (req.query && req.query.id) {
        Major.findById(req.query.id)
            .then(major => {
                // update the major object (patch)
                /*
                major.name = req.body.name ? req.body.name : major.name;
                major.code = req.body.code ? req.body.code : major.code;
                major.description = req.body.description ? req.body.description : major.description;
                */
                // update the major object (put)
                major.name = req.body.name
                major.code = req.body.code
                major.description = req.body.description

                major.save()
                    .then(major => {
                        res.status(200); // OK
                        res.json(major);
                    })
                    .catch(err => {
                        res.status(422);
                        console.log('error while saving the major', err)
                        res.json({
                            error: 'There was an error saving the major'
                        });
                    })




                    .catch(err => {
                        res.status(404);
                        console.log('error while queryting the teacher', err)
                        res.json({ error: "Major doesnt exist" })
                    })

            });
    }
}
const majorDelete = (req, res) => {

    if (req.query && req.query.id) {
        Major.findByIdAndDelete(req.query.id)
            .then(() => {
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
    majorPut,
    majorDelete
}