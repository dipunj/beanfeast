var PoolService = require('../services/pool.service');
var SessionService = require('../services/session.service');
var handleError = require('../util/error.util');

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
		const { newSession, updatedPool } = await SessionService.createNew({
			pool: newPool,
			latitude: parseFloat(latitude),
			longitude: parseFloat(longitude),
			uniqueIdentifier,
		});
		return res.status(200).json({
			data: { sessionData: newSession, poolData: updatedPool },
			message: 'Pool created succesfully',
		});
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
		const newPool = await PoolService.updatePool({
			poolId,
			fromTime,
			toTime,
			maxPoolSize: parseInt(maxPoolSize),
			uniqueIdentifier,
		});
		return res.status(200).json({ data: newPool, message: 'Pool updated succesfully' });
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
		const { newSession, updatedPool } = await SessionService.addToPool({
			poolId,
			uniqueIdentifier,
			latitude,
			longitude,
		});
		return res.status(200).json({
			sessionData: newSession,
			poolData: updatedPool,
			message: `Joined the Pool ${poolId} succesfully`,
		});
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
		return res.status(200).json({
			sessionData,
			poolData,
		});
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
