var Session = require('../db/models/session.model');
var mongoose = require('mongoose');
var PoolService = require('./pool.service');

const createNew = async (params, ...rest) => {
	const { pool, latitude, longitude, uniqueIdentifier } = params;

	const transaction = await mongoose.startSession();
	transaction.startTransaction();

	let sesh_id;

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

			sesh_id = sesh._id;

			await sesh.save();
			const updatedPool = await PoolService.incrementPoolSize({ pool });
			////////////////////

			transaction.endSession();
			return { newSession: sesh, updatedPool };
		} catch (e) {
			// add check for sessionId, if sessionId exists for the same poolId, throw error
			try {
				await Session.deleteOne({ _id: sesh_id });
			} catch (e2) {
				throw e2;
			}
			await transaction.abortTransaction();
			transaction.endSession();
			throw e;
		}
	}
};

const addToPool = async (params, ...rest) => {
	const { poolId, uniqueIdentifier, latitude, longitude } = params;
	try {
		const anySession = await Session.findOne({ poolId, uniqueIdentifier });
		const pool = await PoolService._findPool({ poolId });

		if (anySession) {
			return {
				pool,
				sessionData: anySession,
				message: 'You are already in the pool',
			};
		}
		if (!pool) {
			throw new Error('Invalid Joining URL');
		}

		const { newSession: sessionData, updatedPool: poolData } = await createNew({
			pool,
			latitude,
			longitude,
			uniqueIdentifier,
		});
		return { poolData, sessionData };
	} catch (e) {
		throw e;
	}
};

const SessionService = {
	createNew,
	addToPool,
};

module.exports = SessionService;
