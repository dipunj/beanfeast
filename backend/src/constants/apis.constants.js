const API = Object.freeze({
	TOM_TOM: {
		apiName: 'tomtom',
		apiUrl: 'https://api.tomtom.com/search/2/search',
		apiMaxRating: 100,
	},
	GOOGLE: {
		apiName: 'google',
		apiUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
		apiMaxRating: 5,
	},
	MAPMYINDIA: {
		apiName: 'mapmyindia',
		apiUrl: '',
	},
});

module.exports = API;
