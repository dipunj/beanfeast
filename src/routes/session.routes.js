var express = require('express');
var SessionController = require('../controllers/session.controller');

const router = express.Router();

router.get('/new', SessionController.newSession);
router.get('/update', SessionController.updateSession);

module.exports = router;
