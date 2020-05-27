var mongoose = require('mongoose');
var PlaceSchema = require('../schemas/place.schema');

const { model } = mongoose;
const Place = model('Place', PlaceSchema);

module.exports = Place;
