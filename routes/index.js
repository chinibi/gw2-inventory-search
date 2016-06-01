var express = require('express');
var router = express.Router();

var main = require("../controllers/main");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/characters', main.getCharacterList);

module.exports = router;
