const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    matour: {
        type: String, 
    },
    img: {
        type: [String], 
    }
})

module.exports = mongoose.model("Tour", tourSchema)