var express = require('express');
var PoolController = require('../controllers/pool.controller');

const router = express.Router();

router.get('/show', PoolController.showPool);
router.post('/new', PoolController.createPool);
router.post('/update/:poolId', PoolController.updatePool);

// the get route for join will contain the view to join the pool
router.post('/join/:poolId', PoolController.joinPool);

module.exports = router;
