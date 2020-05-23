var express = require('express');
var PoolController = require('../controllers/pool.controller');

const router = express.Router();

router.post('/new', PoolController.createPool);
router.post('/update', PoolController.updatePool);

module.exports = router;
