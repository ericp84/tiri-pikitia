let mongoose = require('mongoose');

let pinsSchema = mongoose.Schema({
    users: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    title: String,
    description: String,
    imageName: String,
    URL: String,
    createdAt: String,
    updatedAt: String,
})

let pinsModel = mongoose.model('pins', pinsSchema);
module.exports= pinsModel;