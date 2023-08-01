

const mongoose = require('mongoose');
 
 mongoose.connect("mongodb+srv://yogendra123:<yogendra123>@cluster0.jwfkfsz.mongodb.net/?retryWrites=true&w=majority");

 const userSchema = mongoose.Schema({
  name:String,
  username:String,
  email:String,
  password:String
 })


 module.exports = mongoose.model('user',userSchema);