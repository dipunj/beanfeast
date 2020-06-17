var Pool = require('../db/models/pool.model');
var Session = require('../db/models/session.model');

/**
 * finds if a pool with pool id exists
 *
 * @param {*} { poolId }
 * @param {*} rest
 * @returns mongoose pool object
 */
const _findPool = async ({ poolId }, ...rest) => {
	try {
		const pool = await Pool.findOne({ _id: poolId }).exec();
		return pool;
	} catch (e) {
		throw e;
	}
};

const _verifyMember = async ({ poolId, uniqueIdentifier }, ...rest) => {
	try {
		const sessionData = await Session.findOne({ poolId });
		if (!sessionData) {
			throw new Error('Unauthorised');
		} else {
			const poolData = await _findPool({ poolId });
			const allMembers = await Session.find({ poolId });
			const poolMembersLocation = allMembers.map(({ latitude, longitude }) => [
				parseFloat(latitude),
				parseFloat(longitude),
			]);
			return { poolData, sessionData, poolMembersLocation };
		}
	} catch (e) {
		throw e;
	}
};

/**
 * updates the centroid for a pool with poolObj
 *
 * @param {*} { poolObj }
 * @returns nothing, (in place update)
 */
const _updateCentroid_InPlace = async ({ poolObj }) => {
	try {
		const sessions = await Session.find({ poolId: poolObj._id })
			.select('latitude longitude')
			.exec();
		const { sumLat, sumLong } = sessions.reduce(
			(acc, sesh) => {
				acc.sumLat = parseFloat(acc.sumLat) + parseFloat(sesh.latitude);
				acc.sumLong = parseFloat(acc.sumLong) + parseFloat(sesh.longitude);
				return acc;
			},
			{ sumLat: 0, sumLong: 0 }
		);

		poolObj.centroidLatitude = (sumLat / poolObj.currPoolSize).toFixed(7);
		poolObj.centroidLongitude = (sumLong / poolObj.currPoolSize).toFixed(7);

		await poolObj.save();

		// return poolObj;
	} catch (e) {
		throw e;
	}
};

/**
 * creates a new pool with creator as uniqueIdentifier
 *
 * @param {*} { fromTime, toTime, maxPoolSize, uniqueIdentifier }
 * @param {*} rest
 * @returns newly created pool Object
 */
const createNewPool = async ({ fromTime, toTime, maxPoolSize, uniqueIdentifier }, ...rest) => {
	try {
		const newPool = Pool({
			fromTime: fromTime || Date.now(),
			toTime: fromTime || Date.now(),
			maxPoolSize,
			createdBy: uniqueIdentifier,
		});
		await newPool.save();

		return newPool;
	} catch (e) {
		throw e;
	}
};

/**
 * updates the pool details, the uniqueIdentifier must be same as the creator of the pool
 *
 * @param {*} { poolId, fromTime, toTime, maxPoolSize, uniqueIdentifier }
 * @param {*} rest
 * @returns updated pool object and the session which initiated the update request
 */
const updatePool = async ({ poolId, fromTime, toTime, maxPoolSize, uniqueIdentifier }, ...rest) => {
	try {
		var pool = await Pool.findOne({ _id: poolId });
		var session = await Session.findOne({ poolId, uniqueIdentifier });
		if (session) {
			if (maxPoolSize) {
				if (!pool) {
					throw new Error("The pool doesn't exist");
				} else if (pool.createdBy !== uniqueIdentifier) {
					throw new Error(
						'Only the Pool creator can alter the maximum allowed people in the pool'
					);
				} else if (maxPoolSize === 1) {
					throw new Error('A Pool should have atleast two members');
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
					await _updateCentroid_InPlace({ poolObj: pool });
				}
			}
			pool.maxPoolSize = maxPoolSize || pool.maxPoolSize;
			pool.fromTime = fromTime || pool.fromTime;
			pool.toTime = toTime || pool.toTime;

			await pool.save();

			return {
				poolData: pool,
				sessionData: session,
			};
		} else {
			throw new Error('Access Unauthorised to this pool');
		}
	} catch (e) {
		throw e;
	}
};

/**
 *takes a mongoose pool object
 *
 * @param {*} { pool }
 * @param {*} rest
 * @returns udpatedPool
 */
const incrementPoolSize = async ({ pool }, ...rest) => {
	try {
		if (pool.currPoolSize >= pool.maxPoolSize) {
			throw new Error('Max Pool Size reached');
		} else {
			// currPoolSize < maxPoolSize
			pool.currPoolSize += 1;
			await pool.save();

			// pool exactly full
			// updateCentroid saves the pool obj, avoid two writes
			if (pool.currPoolSize === pool.maxPoolSize) {
				// update the centroid, since the number of members would have been reduced
				// const updatedPool =
				await _updateCentroid_InPlace({ poolObj: pool });
				// return updatedPool;
			}
			return pool;
		}
	} catch (e) {
		throw e;
	}
};

const showPool = async (params, ...rest) => {
	const { poolId, uniqueIdentifier } = params;

	try {
		const pool = await PoolService._findPool({ poolId });
		if (!pool) {
			throw new Error('Invalid Joining URL');
		}
		const anySession = await Session.find({ uniqueIdentifier, poolId });
		if (anySession.length > 0) {
			const thisSession = anySession.filter((sesh) => sesh.poolId == pool._id)[0];
			return { sessionData: thisSession, poolData: pool };
		} else {
			throw new Error('Unauthorised: You are not a member of this pool');
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
	_verifyMember,
	showPool,
};

module.exports = PoolService;
