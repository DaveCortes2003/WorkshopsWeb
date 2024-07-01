const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    teacher :{
        type: mongoose.ObjectId,
        ref : 'teachers'
    }
})

module.exports = mongoose.model('Data', dataSchema)