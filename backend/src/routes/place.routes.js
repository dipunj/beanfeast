var express = require('express');
var PlaceController = require('../controllers/place.controller');

const router = express.Router();

router.get('/results/:poolId', PlaceController.showResults);

module.exports = router;
