var mongoose = require('mongoose');
var SessionSchema = require('../schemas/session.schema');

const { model } = mongoose;
const Session = model('Session', SessionSchema);

module.exports = Session;
