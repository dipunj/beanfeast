var CableService = require('../services/cable.services');
var PoolService = require('../services/pool.services');

const newCable = async (req, res, next) => {
	const {
		fromTime = Date.now(),
		toTime = Date.now(),
		maxPeople = Infinity,
		latitude,
		longitude,
		sessionId,
	} = req.query;

	try {
		let cable = await CableService.generateNewCable({
			fromTime,
			toTime,
			maxPeople,
		});
		let poolEntry = await PoolService.addNewUser({
			cableId: cable._id,
			latitude,
			longitude,
			sessionId,
		});
		if (poolEntry) {
			cable = await CableService.incrementPoolSize({ cable });
		}
		return res
			.status(200)
			.json({ status: 200, data: cable, message: 'Cable created succesfully' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

const updateCable = async (req, res, next) => {
	const { cableId, fromTime = Date.now, toTime = Date.now, maxPeople = Infinity } = req.params;

	try {
		const cable = await CableService.updateCable({
			cableId,
			fromTime,
			toTime,
			maxPeople,
		});
		return res
			.status(200)
			.json({ status: 200, data: cable, message: 'Cable updated succesfully' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

const CableController = {
	newCable,
	updateCable,
};

module.exports = CableController;
