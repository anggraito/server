var express = require('express');
var router = express.Router();
var accidentController = require('../controller/accidentController')

router.get('/', accidentController.getRawDataAccident)
router.post('/one', accidentController.getOne)
router.post('/', accidentController.getAccident)

module.exports = router;
