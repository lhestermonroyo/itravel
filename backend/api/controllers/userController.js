const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database');
const Users = require('../models/userModel');

async function loginAuth(req, res, next) {
  const { username, password } = req.body;
  if(username.length !== 0 && password.length !== 0) {
    await Users
    .findOne({ username })
    .then(user => {
      if(!user) {
        return res.json({ success: false, message: 'Username entry incorrect. Please try again.', type: 'danger'})
      }

      console.log("User:", user);
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const payload = {
              _id: user._id,
              fullname: user.fullname,
            };

            jwt.sign(payload, config.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
              if(err) {
                console.log(err);
              }
              res.json({
                success: true,
                message: 'Log in successful',
                token: `Bearer: ${token}`,
              });
            });
          }
          else {
            return res.json({ success: false, message: 'Password entry incorrect. Please try again.', type: 'danger'})
          }
        })
    });
  }
  else {
    res.json({ success: false, message: 'Please fill in the fields.', type: 'danger'})
  }
};

async function getUsers(req, res, next) {
  await Users
    .find()
    .sort({ _id: -1 })
    .then(result => res.json(result));
};

async function saveUser(req, res, next) {
  const { fullname, email, username, password, userType } = req.body;

  if(fullname.length !== 0 && username !== 0 && password !== 0) {
    const newUser = new Users({
      fullname: fullname,
      email: email,
      username: username,
      password: password,
      userType: userType,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if(err) {
          console.log(err);
        }

        newUser.password = hash;
        await newUser
          .save()
          .then(result => res.json({ success: true, message: 'Sign up successful. You can now proceed to log in.', type: 'success'}))
          .catch(err => res.json({ success: false, message: 'An error occured while signing up.', type: 'danger'}));
      })
    })
  }
  else {
    res.json({ success: false, message: 'Please fill in all fields.', type: 'danger'});
  }
};

async function deleteUser(req, res, next) {
  const { id } = req.params;

  await Users
    .findById(id)
    .then(result => result.remove().then(() => res.json({ success: true })))
    .catch(err => res.json({ success: false }));
}

module.exports = {
  getUsers,
  saveUser,
  loginAuth,
  deleteUser,
};