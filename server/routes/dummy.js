var express = require('express');
var router = express.Router();
var accidentController = require('../controller/createDummy')

router.post('/', accidentController.createDummy)

module.exports = router;
