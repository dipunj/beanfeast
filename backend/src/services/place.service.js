var axios = require('axios');
var PoolService = require('./pool.service.js');
var { GoogleStates, AppStates } = require('../constants/states');

const _getPlaces = async (params, { queryString, searchRadius }, ...rest) => {
	const { poolData } = params;
	try {
		const params = {
			key: process.env.GOOGLE_API_KEY,
			keyword: queryString || process.env.defaultQueryString || 'cafe',
			location: `${poolData.centroidLatitude},${poolData.centroidLongitude}`,
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

const showResults = async ({ poolId, uniqueIdentifier, queryString, searchRadius }, ...rest) => {
	const membershipParams = {
		poolId,
		uniqueIdentifier,
	};

	const searchParams = {
		queryString,
		searchRadius,
	};

	try {
		const { poolData, sessionData } = await PoolService._verifyMember(membershipParams);
		if (poolData.currPoolSize === poolData.maxPoolSize) {
			const places = await _getPlaces({ poolData }, searchParams);

			if (places.status === GoogleStates.OVER_QUERY_LIMIT) {
				return {
					status: GoogleStates.OVER_QUERY_LIMIT,
					message:
						'Google says that we have exhausted our daily free limit for Maps API. This is sometimes a error on their end. Please try again. If this message persists, then we have certainly exahausted our free limit',
				};
			} else if (places.status !== GoogleStates.OK) {
				return {
					status: places.status,
					message: places.error_message,
					poolData,
					sessionData,
					searchParams,
				};
			}

			return {
				status: AppStates.GROUP_COMPLETE,
				places,
				poolData,
				sessionData,
				searchParams,
			};
		} else if (poolData.currPoolSize < poolData.maxPoolSize) {
			return {
				status: AppStates.GROUP_INCOMPLETE,
				poolData,
				sessionData,
				searchParams,
			};
		}
	} catch (e) {
		throw e;
	}
};

const PlaceService = {
	showResults,
};

module.exports = PlaceService;
