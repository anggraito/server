var express = require('express');
var router = express.Router();
var controller = require('../controller/getScrappingData')

router.get('/', controller.getDataScrapping)
// router.get('/detail', controller.newsDetail)

module.exports = router
