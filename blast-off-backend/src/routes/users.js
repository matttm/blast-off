const express = require('express');
const router = express.Router();

/* GET users listing. */
router.route('/')
    .get((req, res, next) => {
      res.send('respond with a resource');
    })
    .post((req, res, next) => {
      res.send('making user');
    });

module.exports = router;
