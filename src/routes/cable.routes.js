var express = require('express');
var CableController = require('../controllers/cable.controller');

const router = express.Router();

router.post('/new', CableController.newCable);
router.post('/update', CableController.updateCable);

module.exports = router;
