var Session = require('../db/models/session.model');
var mongoose = require('mongoose');
var PoolService = require('./pool.service');

// TODO: create transaction here

const addNew = async (params, ...rest) => {
	const { pool, latitude, longitude, sessionId } = params;

	if (pool.currPoolSize >= pool.maxPoolSize) {
		throw new Error("Cannot join this pool since it's fully occupied");
	} else {
		try {
			const session = await mongoose.startSession();
			session.startTransaction();

			///////////////////
			const sesh = Session({
				poolId: pool._id,
				sessionId,
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

const SessionService = {
	addNew,
};

module.exports = SessionService;
