const passport = require('passport');
const localstrategy = require ('passport-local').strategy;

passport.use('local.signup', new localstrategy({

    usernamefield: 'email',
    passwordfield: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {




}))

passport.serializeUser((usr, done) => {


});