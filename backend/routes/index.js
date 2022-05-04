/* eslint-disable no-undef */
require('dotenv').config();
var variables = require ('../utils/ErrorHandler.json');
var express = require('express');
var router = express.Router();
///// MODELS /////
const userModel = require ('../models/users');
const pinsModel = require ('../models/pins');
///// SECURITY /////
const bcrypt = require('bcrypt');
const uid2 = require('uid2');
///// CLOUDINARY /////
const cloudinary = require('cloudinary').v2;
var fs = require('fs');
// var request = require('sync-request');
var uniqid = require('uniqid');
const session = require('express-session');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

let date = new Date();
let d = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
var user = null;
///// SIGNUP /////
router.post("/signup", async function (req, res) {

  var newUser= null;
  let result = false
  let error = []
  let token = null;
  let hash = bcrypt.hashSync(req.body.password, 10);

  var pins = await pinsModel.find()
  var userx = await userModel.find().populate('pins')

  /////// CHECK IF THE USER IS ALREADY REGISTERED IN DB ///////
  const userdata = await userModel.findOne({
    email: req.body.email
  })
  /////// IF HE IS ALREADY RESGISTERED DISPLAY ERROR MESSAGE ///////
  if ( userdata != null ){
    error.push(variables.userExist)
  }
  /////// CHECK SERVER SIDE VALIDATIONS ///////
  if( req.body.email === '' 
    || req.body.firstname === '' 
    || req.body.lastname === ''
    || req.body.password === '' 
    ){
      error.push(variables.signupMissingInformations)
    } else if (req.body.password.length < 6) {
      error.push(variables.signupPasswordLength)
    }
  /////// IF EVERYTHING IS OK SAVE USER IN DB ///////
  if (error.length === 0) {
    let userSignup = new userModel({
    email: req.body.email,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: hash,
    token: uid2(32),
    createdAt: d
    })
    newUser = await userSignup.save()  
    if(newUser) {
    result = true
    token = newUser.token;
    }
  }
  res.json({newUser, result, error, token, pins, userx})
})

///// LOGIN /////
router.post('/login', async function (req, res) {

  let result = false;
  let error = [];
  let token = null;

/////// SERVER SIDE VALIDATIONS /////// 
  if (req.body.password === '' ) {
    error.push(variables.loginMissingPassword)
  } if( req.body.email === ''){
      error.push(variables.loginMissingMail)
    }
/////// IF EVERYTHING IS OK USER IS COMPARED TO DB RECORDS ///////
  if(error.length === 0) {
    user = await userModel.findOne({
      email : req.body.email
    })
  }
  if(user) {
    const cryptPass = bcrypt.compareSync(req.body.password, user.password)
    if(cryptPass) {
      result = true;
      token = user.token;
    } else {
      result = false;
      error.push(variables.loginFalsePassword);
    }
  } else  {
    error.push(variables.loginFalseMail)
  }
  console.log(user._id)
  res.json({result, user, error, token})
})



/// GET ALL PINS ON DB WHEN OPENING APP /////
router.get('/recuppins', async function (req, res) {
  let savedPin = await pinsModel.find()

  res.json({savedPin})
})

/// DELETE PINS ///
router.delete('/pins/:_id', async function(req, res) {
  let delPin = await pinsModel.deleteOne({
    _id: req.params._id
  })
  let result = false;
if(delPin.deletedCount === 1) {
  result = true
} else { result = false}

  res.json({result})
})

///// PINS CREATE /////
router.post('/pins', async function(req, res) {
  let error = [];
  console.log(req.session)
  let userx = await userModel.findById(req.session)
  // userx.map((id)=>console.log("USERX MAP ID === >",id))
  let pinx = await pinsModel.find().populate('users')

  req.body.title === "undefined" || req.body.title.length < 3 
  ? error.push("votre titre doit contenir au moins 3 caractères") 
  : error = [];

  req.body.description === "undefined" || req.body.description.length < 10
  ? error.push("La description de votre pin doit contenir au moins 10 caractères")
  : error = [];
  let pins = new pinsModel({
    title: req.body.title,
    description: req.body.description,
    imageName: req.body.imageName,
    URL: req.body.url,
    createdAt: d,
    id: req.body.token,
    users: req.body.id
  })
  
let newpin = await pins.save()


res.json({newpin, error, userx, pinx})
})

/// UPLOAD PINS ON CLOUDINARY ///
router.post('/upload', async function (req, res) {
  try {    
  let picture = './tmp' + uniqid() + '.jpg'
  let resultCopy = await req.files.file.mv(picture)
  if(!resultCopy) {
    console.log('envoi vers cloudinary');
    let cloudres = await cloudinary.uploader.upload(picture)
    console.log(cloudres)
    res.json({cloudres})

  } else {
    res.json({result: false, message: resultCopy})
  }
  fs.unlinkSync(picture)
} catch (err) {
  console.log(err)
}
})

/// UPDATE PINS ///
router.put('/pins_edit/:_id', async function(req,res) {
  try {
      const pinsEdit = await pinsModel.findByIdAndUpdate({_id:req.params._id}, {
      title: req.body.title,
      description: req.body.description,
      imageName: req.body.imageName
  })
  res.json({pinsEdit})
  } catch (err) {
    console.log(err)
  } 
})

module.exports = router;
