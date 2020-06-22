var PlaceService = require('../services/place.service');
var handleError = require('../util/error.util');
var handleSuccess = require('../util/success.util');

const showResults = async (req, res, next) => {
	const { uniqueIdentifier, queryString, searchRadius } = req.query;
	const { poolId } = req.params;

	const params = {
		poolId,
		uniqueIdentifier,
		queryString: queryString || process.env.defaultQueryString || 'cafe',
		searchRadius: searchRadius || 2000,
	};

	try {
		if (!poolId) throw new Error('Invalid pool');
		if (!uniqueIdentifier) throw new Error('Empty uniqueIdentifier');

		const result = await PlaceService.showResults(params);
		return handleSuccess(res, result);
	} catch (e) {
		return handleError(res, e);
	}
};

const PlaceController = {
	showResults,
};

module.exports = PlaceController;
