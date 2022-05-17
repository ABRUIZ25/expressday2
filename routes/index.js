var express = require('express');
var router = express.Router();
const date = Date()
const user = {
  antonio: {
    name: 'antonio',
    FavMovie: 'superman'
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });

});
router.get('/time', function (req, res, next) {
  res.send(date)

});

router.get('/username', function (req, res, next) {
  res.send(user.antonio.name)

});
router.get('/favmovie', function (req, res, next) {
  res.send(user.antonio.FavMovie)

});


module.exports = router;
