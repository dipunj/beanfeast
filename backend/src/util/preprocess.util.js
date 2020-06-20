const API = require('../constants/apis.constants');

const convertTomTom = (apiResponse) => {
	const { results } = apiResponse;
	return results.map((item) => ({
		id: item.id,
		name: item.poi.name,
		phone: item.poi.phone,
		categories: item.poi.categories,
		fullAddress: item.address.freeformAddress,
		shortAddress: item.address.streetName,
		// TODO: find out if tom tom has a rating system
		rating: 3,
		position: {
			lat: item.position.lat,
			lon: item.position.lon,
		},
	}));
};

const preprocess = (apiResponse, apiName) => {
	switch (apiName) {
		case API.TOM_TOM.apiName:
			return convertTomTom(apiResponse);
		case API.GOOGLE.apiName:
			return convertGoogle(apiResponse);
		case API.MAPMYINDIA.apiName:
			return convertMapMyIndia(apiResponse);
	}
};

module.exports = preprocess;
