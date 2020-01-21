const express = require('express');

const router = express.Router();


// Login page
router.get('/login', (req, res) => res.render('login'));

// Register page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];


  // check required fields
  if (!name || !email || !password || password2) {
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
    res.send('pass')
  }

});

module.exports = router;

