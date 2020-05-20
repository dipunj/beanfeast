var express = require('express');
var PoolController = require('../controllers/pool.controller');

const router = express.Router();

router.get('/new', PoolController.newPool);
router.get('/update', PoolController.updatePool);

module.exports = router;
