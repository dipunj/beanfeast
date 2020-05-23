var Pool = require('../db/models/pool.model');

// TODO: create transaction here
const createNewPool = async (params, ...rest) => {
	const { fromTime, toTime, maxPoolSize } = params;

	try {
		const newPool = Pool({ fromTime, toTime, maxPoolSize });
		await newPool.save();

		return newPool;
	} catch (e) {
		throw e;
	}
};

const updatePool = async (params, ...rest) => {
	const { PoolId, fromTime, toTime, maxPoolSize } = params;

	try {
		const pool = await Pool.findOne({ _id: PoolId }, 'maxPoolSize fromTime toTime');

		pool.maxPoolSize = maxPoolSize || pool.maxPoolSize;
		pool.fromTime = fromTime || pool.fromTime;
		pool.toTime = toTime || pool.toTime;

		await pool.save();

		return pool;
	} catch (e) {
		throw e;
	}
};

const findPool = async (params, ...rest) => {
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
	findPool,
};

module.exports = PoolService;
