var Session = require('../db/models/session.model');

// TODO: create transaction here

const addNew = async (params, ...rest) => {
	const { poolId, latitude, longitude, sessionId } = params;
	try {
		const sesh = Session({
			poolId,
			sessionId,
			latitude,
			longitude,
		});
		await sesh.save();
		return sesh;
	} catch (e) {
		// Log Errors
		console.error(e);
	}
};

const SessionService = {
	addNew,
};

module.exports = SessionService;
