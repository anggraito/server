var express = require('express');
var router = express.Router();
var accidentController = require('../controller/accidentController')

router.post('/', accidentController.getAccident)

module.exports = router;
