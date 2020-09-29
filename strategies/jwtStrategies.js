const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
// const Person = require('../models/Person');
mongoose.model('myPerson'); //Whenever we need to create a mongoose object, we need to create it through mongoose model. Which is a good practice.
const myKey = require("../setup/myUrl");

var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = myKey.secret;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        Person.findById(jwt_payload.id)
            .then(person => {
                if(person){
                    return done(null, person);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    }))
}
