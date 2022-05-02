let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    token: String,
    role: String,
    createdAt: {type: Date, default: Date.now},
})

let userModel = mongoose.model('users', userSchema);
module.exports= userModel;