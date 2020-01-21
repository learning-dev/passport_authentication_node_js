const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


//user Model
const User = require('../models/User');

// Login page
router.get('/login', (req, res) => res.render('login'));

// Register page
router.get('/register', (req, res) => res.render('register'));

// Register Handle

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];


  // check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in the details' });
  }

  // check passowrd fields
  if (password != password2) {
    errors.push({ msg: 'Passwords dont match' });
  }

  //  passowrd field is atleast 8 characters long
  if (password.length < 8) {
    errors.push({ msg: 'Passwords should be 8 characters long' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //Validation Passed
    User.findOne({ email: email})
    .then((user) => {
      if (user) {
      errors.push({msg: 'User email is already registered' })
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
      } else {
        const newUser = new User({
          name, 
          email, 
          password
        })
        // hashed password
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
              if (err) throw err;
              // Set password to hashed password
              newUser.password = hash;
              newUser.save()
                .then( user =>{
                  req.flash('success_msg', 'You are now Registered and can Log in!')
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            })
        } )
      }
    });
    
  }
});

//login handle 
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
