var express = require('express');
var router = express.Router();
var child = require('../child.js');

/* GET home page. */
router.get('/lagou', function(req, res, next) {
  console.log('****');
  var c = new child();
  c.runCommand();
});

module.exports = router;
