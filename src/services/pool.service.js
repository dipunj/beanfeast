var Pool = require('../db/models/pool.model');
var Session = require('../db/models/session.model');

const createNewPool = async (params, ...rest) => {
	const { fromTime, toTime, maxPoolSize, uniqueIdentifier } = params;

	try {
		const newPool = Pool({ fromTime, toTime, maxPoolSize, createdBy: uniqueIdentifier });
		await newPool.save();

		return newPool;
	} catch (e) {
		throw e;
	}
};

const updatePool = async (params, ...rest) => {
	const { poolId, fromTime, toTime, maxPoolSize, uniqueIdentifier } = params;

	try {
		const pool = await Pool.findOne({ _id: poolId });
		if (maxPoolSize) {
			if (!pool) {
				throw new Error('Invalid Joining URL');
			} else if (pool.createdBy !== uniqueIdentifier) {
				throw new Error(
					'Pool creator can only alter the maximum allowed people in the pool'
				);
			} else if (pool.currPoolSize > maxPoolSize) {
				//////////////////////////////////////////////
				// mongodb doesn't support limit on deleteMany
				// const latestMembers = Session.find({ poolId: pool._id })
				// 	.sort('-date')
				// 	.limit(pool.currPoolSize - maxPoolSize);
				// const result = await Session.deleteMany(latestMembers);
				//////////////////////////////////////////////

				// find the members who joined most recently and remove them
				const latestMembers = await Session.find({ poolId: pool._id })
					.sort({ createdAt: 'desc' })
					.limit(pool.currPoolSize - maxPoolSize)
					.exec();
				const memberIds = latestMembers.map((mem) => mem._id);
				await Session.deleteMany({
					_id: {
						$in: memberIds,
					},
				});

				// since there are maxPoolSize number of people in this pool now
				pool.currPoolSize = maxPoolSize;
			}
		}

		pool.maxPoolSize = maxPoolSize || pool.maxPoolSize;
		pool.fromTime = fromTime || pool.fromTime;
		pool.toTime = toTime || pool.toTime;

		await pool.save();

		return pool;
	} catch (e) {
		throw e;
	}
};

const _findPool = async (params, ...rest) => {
	const { poolId } = params;
	try {
		const pool = await Pool.findOne({ _id: poolId }).exec();
		return pool;
	} catch (e) {
		throw e;
	}
};

const incrementPoolSize = async (params, ...rest) => {
	const { pool } = params;
	try {
		if (pool.currPoolSize >= pool.maxPoolSize) {
			throw new Error('Max Pool Size reached');
		} else {
			const poolObj = await Pool.findOne({ _id: pool._id });
			poolObj.currPoolSize += 1;
			const incrementedPool = await poolObj.save();

			return incrementedPool;
		}
	} catch (e) {
		throw e;
	}
};

const PoolService = {
	createNewPool,
	updatePool,
	incrementPoolSize,
	_findPool,
};

module.exports = PoolService;
