var mongoose = require('mongoose');
var PoolSchema = require('../schemas/pool.schema');

const { model } = mongoose;
const Pool = model('Pool', PoolSchema);

module.exports = Pool;
