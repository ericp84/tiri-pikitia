/* eslint-disable no-undef */
require('dotenv').config()
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

// var fs = require('fs');
// var request = require('sync-request');
// var uniqid = require('uniqid');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_KEY 
});

///// SIGNUP /////
router.post("/signup", async function (req, res) {

  let newUser= null;
  let result = false
  let error = []
  let token = null;
  let hash = bcrypt.hashSync(req.body.password, 10);

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
    token: uid2(32)
    })
    newUser = await userSignup.save()  
    if(newUser) {
    result = true
    token = newUser.token;
    }
  }
  console.log(error)
  res.json({newUser, result, error, token})
})

///// LOGIN /////
router.post('/login', async function (req, res) {

  let result = false;
  let user = null;
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
  res.json({result, user, error, token})
})

///// PINS CREATE /////
router.post('/pins', async function(req, res) {
  let pins = new pinsModel({
    title: req.body.title,
    description: req.body.description,
    imageName: req.body.imageName,
    URL: req.body.url,
    userId: req.body.token
  })
  console.log("req.body.imageName == ",req.body.imageName)
let newpin = await pins.save()
res.json({newpin})
})

/// GET ALL PINS ON DB WHEN OPENING APP /////
router.get('/recuppins', async function (req, res) {
  let savedPin = await pinsModel.find();
  res.json({savedPin})
})

/// DELETE PINS ///
router.delete('/pins/:_id', async function(req, res) {
  let delPin = await pinsModel.deleteOne({
    id: req.params.id
  })
  console.log("req.params.id == ", req.params._id)
  console.log(delPin)
  console.log(delPin.deletedCount)
  let result = false;
if(delPin.deletedCount === 1) {
  result = true
} else { result = false}

  res.json({result})
})

/// UPLOAD PINS ON CLOUDINARY ///
router.post('/upload', async function (req, res) {
  var resultCopy = await req.files.file;
  console.log(resultCopy)

  if(!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload();
  }
  res.json({url: resultCloudinary.url})
  console.log(resultCloudinary.url)
})

module.exports = router;
