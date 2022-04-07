let mongoose = require('mongoose');

let pinsSchema = mongoose.Schema({
    title: String,
    description: String,
    imageName: String,
    URL: String
})

let pinsModel = mongoose.model('pins', pinsSchema);
module.exports= pinsModel;