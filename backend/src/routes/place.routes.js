var express = require('express');
var PlaceController = require('../controllers/place.controller');

const router = express.Router();

router.post('/status/:poolId', PlaceController.showStatus);

module.exports = router;
