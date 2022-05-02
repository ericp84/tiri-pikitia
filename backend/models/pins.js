let mongoose = require('mongoose');

let pinsSchema = mongoose.Schema({
    title: String,
    description: String,
    imageName: String,
    URL: String,
    createdAt: Date,
    updatedAt: Date
})

let pinsModel = mongoose.model('pins', pinsSchema);
module.exports= pinsModel;