var axios = require('axios');
var PoolService = require('./pool.service.js');
var { GoogleStates, AppStates } = require('../constants/states');

const _getPlaces = async (params, { queryString, searchRadius }, ...rest) => {
	const { pool } = params;
	try {
		const params = {
			key: process.env.GOOGLE_API_KEY,
			keyword: queryString || process.env.defaultQueryString || 'cafe',
			location: `${pool.centroidLatitude},${pool.centroidLongitude}`,
			radius: Math.max(searchRadius, process.env.defaultSearchRadius) || 200,
		};
		const places = await axios.get(
			'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
			{ crossDomain: true, params }
		);
		return places.data;
	} catch (e) {
		throw e;
	}
};

const getStatusAndUpdate = async (
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

			if (places.status === GoogleStates.OVER_QUERY_LIMIT) {
				return {
					status: GoogleStates.OVER_QUERY_LIMIT,
					message:
						'Google says that we have exhausted our daily free limit for Maps API. This is sometimes a error on their end. Please try again, if it persists, then we have certainly exahausted our free limit',
				};
			} else if (places.status !== GoogleStates.OK) {
				return {
					status: places.status,
					message: places.error_message,
					pool,
				};
			}

			return {
				status: AppStates.GROUP_COMPLETE,
				places,
				pool,
			};
		} else if (pool.currPoolSize < pool.maxPoolSize) {
			return {
				status: AppStates.GROUP_INCOMPLETE,
				pool,
			};
		}
	} catch (e) {
		throw e;
	}
};

const PlaceService = {
	getStatusAndUpdate,
};

module.exports = PlaceService;
