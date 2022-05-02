let mongoose = require('mongoose');

let pinsSchema = mongoose.Schema({
    title: String,
    description: String,
    imageName: String,
    URL: String,
    createdAt: String,
    updatedAt: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
})

let pinsModel = mongoose.model('pins', pinsSchema);
module.exports= pinsModel;