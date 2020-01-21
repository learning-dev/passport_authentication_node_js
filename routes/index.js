const express = require('express');

const router = express.Router();


// router.get('/', ())

router.get('/', (req, res) => {
  res.render('welcome');
});

module.exports = router;

