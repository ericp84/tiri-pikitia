var express = require('express');
var router = express.Router();
///// MODELS /////
const userModel = require ('../models/users');
const pinsModel = require ('../models/pins');
///// SECURITY /////
const bcrypt = require('bcrypt');
const uid2 = require('uid2');

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
    error.push('cet utilisateur est déja présent 🥴')
    console.log(userdata)
  }
  /////// CHECK SERVER SIDE VALIDATIONS ///////
  if( req.body.email === '' 
    || req.body.firstname === '' 
    || req.body.lastname === ''
    || req.body.password === '' 
    ){
      error.push('veuillez verifier vos informations 😵')
    } else if (req.body.password.length < 6) {
      error.push('votre mot de passe doit contenir au moins 6 caractères 6️⃣')
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
    error.push('Apparement vous avez oublié de renseigner votre mot de passe 🥶')
  } else if( req.body.email === ''){
      error.push("Désolé je n'ai pas réussi à lire votre email 😕, votre email a-t-il bien été renseigné ❓")
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
      error.push('Oops, vos identifiants ne semblent pas correspondre ❗');
    }
  } else {
    error.push("🤔 je n'ai pas reconnu votre email, avez vous un compte ❓")
  }
  res.json({result, user, error, token})
})

///// PINS CREATE /////
router.post('/pins', async function(req, res) {
  let pins = new pinsModel({
    title: req.body.title,
    description: req.body.description,
    imageName: req.body.imageName,
    URL: req.body.url
  })
let newpin = await pins.save()
res.json({newpin})
})

/// GET ALL PINS ON DB WHEN OPENING APP /////
router.get('/recuppins', async function (req, res) {
  let savedPin = await pinsModel.find();
  res.json({savedPin})
})

module.exports = router;
