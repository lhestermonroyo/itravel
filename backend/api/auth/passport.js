const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Users = require('../models/userModel');
const config = require('../config/database');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Users
        .findById(jwt_payload.id)
        .then(user => {
          return done(null, user);
        })
        .catch(err => console.log("Error:", err));
    })
  );
};