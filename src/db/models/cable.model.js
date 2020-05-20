var mongoose = require('mongoose');
var CableSchema = require('../schemas/cable.schema');

const { model } = mongoose;
const Cable = model('Cable', CableSchema);

module.exports = Cable;
