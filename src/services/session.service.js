var Session = require('../db/models/session.model');
var mongoose = require('mongoose');
var PoolService = require('./pool.service');

const createNew = async (params, ...rest) => {
	const { pool, latitude, longitude, uniqueIdentifier } = params;

	const session = await mongoose.startSession();
	session.startTransaction();

	if (pool.currPoolSize >= pool.maxPoolSize) {
		throw new Error("Cannot join this pool since it's fully occupied");
	} else {
		try {
			///////////////////
			const sesh = Session({
				poolId: pool._id,
				uniqueIdentifier,
				latitude,
				longitude,
			});

			await sesh.save();
			const updatedPool = await PoolService.incrementPoolSize({ pool });
			////////////////////

			session.endSession();

			return { newSession: sesh, updatedPool };
		} catch (e) {
			// add check for sessionId, if sessionId exists for the same poolId, throw error
			await session.abortTransaction();
			session.endSession();
			throw e;
		}
	}
};

const addToPool = async (params, ...rest) => {
	const { poolId, uniqueIdentifier, latitude, longitude } = params;
	try {
		const pool = await PoolService._findPool({ poolId });
		if (!pool) {
			throw new Error('Invalid Joining URL');
		}
		const anySession = await Session.find({ uniqueIdentifier });
		if (anySession && anySession.filter((sesh) => sesh.poolId == pool._id).length > 0) {
			throw new Error('You are already in this pool!');
		}
		const newSession = await createNew({
			pool,
			latitude,
			longitude,
			uniqueIdentifier,
		});
		return newSession;
	} catch (e) {
		throw e;
	}
};

const SessionService = {
	createNew,
	addToPool,
};

module.exports = SessionService;
