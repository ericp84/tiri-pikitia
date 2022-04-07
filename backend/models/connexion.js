var mongoose = require('mongoose');
var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
  }
  mongoose.connect('mongodb+srv://admin:azerty16@cluster0.306p7.mongodb.net/Pintabook?retryWrites=true&w=majority',
    options,function(err){
      if(err) {
         console.log("erreur connexion bdd"(err)); 
      } else {
          console.log("conexion bdd réussie")
      }
    }
  )
  module.exports = mongoose