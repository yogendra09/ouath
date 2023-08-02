

const mongoose = require('mongoose');
 
 mongoose.connect("mongodb+srv://yogendra123:nn0dANZFobqP0i5A@cluster0.qndz7nv.mongodb.net/?retryWrites=true&w=majority");

 const userSchema = mongoose.Schema({
  name:String,
  username:String,
  email:String,
  password:String
 })


 module.exports = mongoose.model('user',userSchema);