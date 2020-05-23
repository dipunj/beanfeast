var mongoose = require('mongoose');
var PlacesSchema = require('../schemas/places.schema');

const { model } = mongoose;
const Places = model('Places', PlacesSchema);

module.exports = Places;
