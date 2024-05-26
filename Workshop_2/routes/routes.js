const express = require('express');

const router = express.Router()


router.get('/hello', (req, res) => {
    let response = { "response": "Hello World" };

    if (req.query.message) {
        response = { "response": "Hello " + req.query.message }
    }
    res.status(200).json(response);
});

router.post('/user', (req, res) => {

    res.status(201).json({ "response": "El usuario " + req.body.name +" "+ req.body.lastname + " ha sido creado." });

})

module.exports = router;