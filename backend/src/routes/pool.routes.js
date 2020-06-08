var express = require('express');
var PoolController = require('../controllers/pool.controller');

const router = express.Router();

router.post('/create/new', PoolController.createPool);
router.get('/read/:poolId', PoolController.showPool);
router.post('/update/:poolId', PoolController.updatePool);
router.post('/join/:poolId', PoolController.joinPool);

module.exports = router;
