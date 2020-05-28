var PlaceService = require('../services/place.service');
var handleError = require('../util/error.util');

const showStatus = async (req, res, next) => {
	const { uniqueIdentifier, fromTime, toTime, maxPeople, queryString, searchRadius } = req.query;

	const { poolId } = req.params;

	const params = {
		poolId,
		fromTime,
		toTime,
		maxPoolSize: parseInt(maxPeople),
		uniqueIdentifier,
		queryString,
		searchRadius,
	};

	try {
		if (!poolId) {
			throw new Error('Invalid pool');
		}
		if (!uniqueIdentifier) {
			throw new Error('Empty uniqueIdentifier');
		}
		const result = await PlaceService.getStatusAndUpdate(params);
		return res.status(200).json({ data: result });
	} catch (e) {
		return handleError(res, e);
	}
};

const PlaceController = {
	showStatus,
};

module.exports = PlaceController;
