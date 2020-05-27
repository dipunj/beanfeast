var axios = require('axios');
var PoolService = require('./pool.service.js');

const _getPlaces = async (params, ...rest) => {
	const { pool } = params;
	try {
		const places = await axios.get(
			'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
			{
				crossDomain: true,
				params: {
					key: process.env.GOOGLE_API_KEY,
					keyword: pool.queryString,
					location: `${pool.centroidLatitude},${pool.centroidLongitude}`,
					// search in atleast a radius of 200m
					radius: Math.max(pool.searchRadius, 200),
				},
			}
		);
		return places.data;
	} catch (e) {
		throw e;
	}
};

const getStatus = async (params, ...rest) => {
	const {
		poolId,
		fromTime,
		toTime,
		maxPoolSize,
		uniqueIdentifier,
		queryString,
		searchRadius,
	} = params;

	const updateParams = {
		poolId,
		fromTime,
		toTime,
		maxPoolSize,
		uniqueIdentifier,
		queryString,
		searchRadius,
	};

	try {
		const pool = await PoolService.updatePool(updateParams);
		if (pool.currPoolSize === pool.maxPoolSize) {
			const places = await _getPlaces({ pool });

			if (places.status !== 'OK') {
				return {
					status: 'OVER_QUERY_LIMIT',
					message:
						"Unfortunately we have exhausted our daily quota limit for Google's Maps API, Sorry for the inconvenience caused",
				};
			}
			return {
				status: 'GROUP_COMPLETE',
				places,
				pool,
			};
		} else if (pool.currPoolSize < pool.maxPoolSize) {
			return {
				status: 'GROUP_INCOMPLETE',
				pool,
			};
		}
	} catch (e) {
		throw e;
	}
};

const PlaceService = {
	getStatus,
};

module.exports = PlaceService;
