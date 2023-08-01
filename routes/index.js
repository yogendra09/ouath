const express = require('express');
const router = express.Router();
const userModel = require('./users');
const passport = require('passport');
// const mongoStore = require('connect-mongo');
const GoogleStrategy = require('passport-google-oidc');
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: 'https://ouath.onrender.com/oauth2/redirect/google',
  scope: [ 'email','profile' ]
},async function verify(issuer, profile, cb) {
  try{
    var existingUser = await userModel.findOne({email:profile.emails[0].value});

    if(existingUser){
      return cb(null,existingUser);
    }else{
    var newUser = await userModel.create({
         name:profile.displayName,
         username:profile.name.givenName,
         email:profile.emails[0].value
      })
      return cb(null,newUser);
    }
  }catch(err){
    console.log(err);
  }

}));          

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/alluser',
  failureRedirect: '/login'
}));

router.get('/alluser',async function(req,res,next){
  var users = await userModel.find();
  res.send("hry");
})

router.get('/login/federated/google', passport.authenticate('google'));

module.exports = router;
