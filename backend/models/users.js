let mongoose = require('mongoose');
// let date = new Date();
// let d = date.toLocaleDateString;
// let d = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
// console.log("d from mongoose model =", d)
// var timestamp = Date.now()
// var date = new Date(timestamp);

// const d = date.getDate(+1)+
//           "/"+(date.getMonth()+1)+
//           "/"+date.getFullYear();
//           console.log(d)

let userSchema = mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    token: String,
    role: String,
    createdAt: String,
})

let userModel = mongoose.model('users', userSchema);
module.exports= userModel;