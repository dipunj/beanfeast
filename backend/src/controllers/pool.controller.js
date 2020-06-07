var PoolService = require('../services/pool.service');
var SessionService = require('../services/session.service');
var handleError = require('../util/error.util');
var handleSuccess = require('../util/success.util');

const createPool = async (req, res, next) => {
	const {
		fromTime = Date.now(),
		toTime = Date.now(),
		maxPoolSize = Infinity,
		latitude,
		longitude,
		uniqueIdentifier,
	} = req.body;

	try {
		const newPool = await PoolService.createNewPool({
			fromTime,
			toTime,
			maxPoolSize: parseInt(maxPoolSize),
			uniqueIdentifier,
		});
		const { newSession: sessionData, updatedPool: poolData } = await SessionService.createNew({
			pool: newPool,
			latitude: parseFloat(latitude),
			longitude: parseFloat(longitude),
			uniqueIdentifier,
		});
		return handleSuccess(
			res,
			{ sessionData, poolData },
			{ message: 'Pool created succesfully' }
		);
	} catch (e) {
		return handleError(res, e);
	}
};

const updatePool = async (req, res, next) => {
	const { fromTime, toTime, maxPoolSize, uniqueIdentifier } = req.body;
	const { poolId } = req.params;
	try {
		if (!poolId) {
			throw new Error('Incomplete joining URL');
		}
		const { poolData, sessionData } = await PoolService.updatePool({
			poolId,
			fromTime,
			toTime,
			maxPoolSize: parseInt(maxPoolSize),
			uniqueIdentifier,
		});
		return handleSuccess(res, { poolData, sessionData });
	} catch (e) {
		return handleError(res, e);
	}
};

const joinPool = async (req, res, next) => {
	const { uniqueIdentifier, latitude, longitude } = req.body;
	const { poolId } = req.params;
	try {
		if (!uniqueIdentifier) {
			throw new Error('Browser fingerprint is required to register into the pool');
		} else if (!latitude || !longitude) {
			throw new Error('Location is null');
		} else if (!poolId) {
			throw new Error('Incomplete joining URL');
		}
		const { sessionData, poolData, message } = await SessionService.addToPool({
			poolId,
			uniqueIdentifier,
			latitude,
			longitude,
		});

		return handleSuccess(
			res,
			{ sessionData, poolData },
			{ message: message || `Joined the Pool ${poolId} succesfully` }
		);
	} catch (e) {
		return handleError(res, e);
	}
};

const showPool = async (req, res, next) => {
	const { uniqueIdentifier, poolId } = req.query;

	try {
		if (!uniqueIdentifier) {
			throw new Error('Browser fingerprint is required');
		} else if (!poolId) {
			throw new Error('Invalid URL');
		}
		const { sessionData, poolData } = await PoolService.showPool({
			poolId,
			uniqueIdentifier,
		});
		return handleSuccess(res, { sessionData, poolData });
	} catch (e) {
		return handleError(res, e);
	}
};

const PoolController = {
	createPool,
	updatePool,
	joinPool,
	showPool,
};

module.exports = PoolController;
