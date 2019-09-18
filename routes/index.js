var express = require('express');
var router = express.Router();
var sms_controller = require('../controller/sms.controller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/form', sms_controller.sms_send)
module.exports = router;
