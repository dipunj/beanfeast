var axios = require('axios');
var PoolService = require('./pool.service.js');

const _getPlaces = async (params, { queryString, searchRadius }, ...rest) => {
	const { pool } = params;
	try {
		const places = await axios.get(
			'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
			{
				crossDomain: true,
				params: {
					key: process.env.GOOGLE_API_KEY,
					keyword: queryString || process.env.defaultQueryString || 'cafe',
					location: `${pool.centroidLatitude},${pool.centroidLongitude}`,
					radius: Math.max(searchRadius, process.env.minSearchRadius || 200),
				},
			}
		);
		return places.data;
	} catch (e) {
		throw e;
	}
};

const getStatus = async (
	{ poolId, fromTime, toTime, maxPoolSize, uniqueIdentifier, queryString, searchRadius },
	...rest
) => {
	const updateParams = {
		poolId,
		fromTime,
		toTime,
		maxPoolSize,
		uniqueIdentifier,
	};

	const searchParams = {
		queryString,
		searchRadius,
	};

	try {
		const pool = await PoolService.updatePool(updateParams);
		if (pool.currPoolSize === pool.maxPoolSize) {
			const places = await _getPlaces({ pool }, searchParams);

			if (places.status !== 'OK') {
				return {
					status: 'OVER_QUERY_LIMIT',
					message:
						"Unfortunately we have exhausted our daily free quota for Google's Maps API, Sorry for the inconvenience caused",
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
