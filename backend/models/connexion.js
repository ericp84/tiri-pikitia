require('dotenv').config();
var mongoose = require('mongoose');
var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
  }
  mongoose.connect(process.env.DB_URI,
    options,function(err){
      if(err) {
         console.log("erreur connexion bdd"(err)); 
      } else {
          console.log("conexion bdd réussie")
      }
    }
  )
  module.exports = mongoose