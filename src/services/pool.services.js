var Pool = require('../db/models/pool.model');

// TODO: create transaction here

const addNewUser = async (params, ...rest) => {
	const { cableId, latitude, longitude, sessionId } = params;
	try {
		const poolUser = await Pool({
			cableId,
			sessionId,
			latitude,
			longitude,
		});
		poolUser.save();
		return poolUser;
	} catch (e) {
		// Log Errors
		console.error(e);
	}
};

const PoolService = {
	addNewUser,
};

module.exports = PoolService;
