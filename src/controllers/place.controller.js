var PlaceService = require('../services/place.service');
var handleError = require('../util/error.util');

const showStatus = async (req, res, next) => {
	const { uniqueIdentifier } = req.query;
	const { poolId } = req.params;

	try {
		if (!poolId) {
			throw new Error('Invalid pool');
		}
		if (!uniqueIdentifier) {
			throw new Error('Empty uniqueIdentifier');
		}
		const result = await PlaceService.getStatus({ uniqueIdentifier, poolId });
		return res.status(200).json({ data: result });
	} catch (e) {
		return handleError(res, e);
	}
};

const PlaceController = {
	showStatus,
};

module.exports = PlaceController;
