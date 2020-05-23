var PoolService = require('../services/pool.service');
var SessionService = require('../services/session.service');

const createPool = async (req, res, next) => {
	const {
		fromTime = Date.now(),
		toTime = Date.now(),
		maxPeople = Infinity,
		latitude,
		longitude,
		sessionId,
	} = req.query;

	let newPool;
	try {
		newPool = await PoolService.createNewPool({
			fromTime,
			toTime,
			maxPeople,
		});

		await SessionService.addNew({
			cableId: newPool._id,
			latitude,
			longitude,
			sessionId,
		});
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}

	try {
		const updatedCable = await PoolService.incrementPoolSize({ thisPool: newPool });
		return res
			.status(200)
			.json({ status: 200, data: updatedCable, message: 'Cable created succesfully' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

const updatePool = async (req, res, next) => {
	const { cableId, fromTime = Date.now, toTime = Date.now, maxPeople = Infinity } = req.params;

	try {
		const newPool = await PoolService.updatePool({
			cableId,
			fromTime,
			toTime,
			maxPeople,
		});
		return res
			.status(200)
			.json({ status: 200, data: newPool, message: 'Cable updated succesfully' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

const PoolController = {
	createPool,
	updatePool,
};

module.exports = PoolController;
