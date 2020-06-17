var axios = require('axios');
var PoolService = require('./pool.service.js');
var { GoogleStates, AppStates } = require('../constants/states');

const _getPlaces = async (params, { queryString, searchRadius }, ...rest) => {
	const { poolData } = params;
	try {
		const params = {
			key: process.env.GOOGLE_API_KEY,
			keyword: queryString,
			location: `${poolData.centroidLatitude},${poolData.centroidLongitude}`,
			radius: Math.max(searchRadius, process.env.defaultSearchRadius) || 2000,
		};

		const tomTomparams = {
			key: process.env.TOMTOM_API_KEY,
			lat: parseFloat(poolData.centroidLatitude),
			lon: parseFloat(poolData.centroidLongitude),
			radius: Math.max(searchRadius, process.env.defaultSearchRadius) || 2000,
			idxSet: 'POI',
			categorySet: '9376',
		};

		const places = await axios.get('https://api.tomtom.com/search/2/nearbySearch/.json', {
			crossDomain: true,
			params: tomTomparams,
		});

		// Google you just suck here, GCP just won't accept the same debit card which AWS accepted without question
		// hence not using Google maps api, instead using tomtom api offers very competetive results
		// const places = await axios.get(
		// 	`https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
		// 	{ crossDomain: true, params }
		// );

		return {
			places: places.data,
			apiQueryString: params.keyword,
			apiRadius: params.radius,
		};
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
		const { poolData, sessionData, poolMembersLocation } = await PoolService._verifyMember(
			membershipParams
		);
		if (poolData.currPoolSize === poolData.maxPoolSize) {
			const { places, apiQueryString, apiRadius } = await _getPlaces(
				{ poolData },
				searchParams
			);

			return {
				poolData,
				sessionData,
				poolMembersLocation,
				placesData: places,
				apiQueryString,
				apiRadius,
			};

			// 	if (places.status === GoogleStates.OVER_QUERY_LIMIT) {
			// 		return {
			// 			status: GoogleStates.OVER_QUERY_LIMIT,
			// 			message:
			// 				'Google says that we have exhausted our daily free limit for Maps API. This is sometimes a error on their end. Please try again. If this message persists, then we have certainly exahausted our free limit',
			// 		};
			// 	} else if (places.status !== GoogleStates.OK) {
			// 		return {
			// 			status: places.status,
			// 			message: places.error_message,
			// 			poolData,
			// 			sessionData,
			// 			apiQueryString,
			// 			apiRadius,
			// 		};
			// 	}

			// 	return {
			// 		status: AppStates.GROUP_COMPLETE,
			// 		places,
			// 		poolData,
			// 		sessionData,
			// 		apiQueryString,
			// 		apiRadius,
			// 	};
			// } else if (poolData.currPoolSize < poolData.maxPoolSize) {
			// 	return {
			// 		status: AppStates.GROUP_INCOMPLETE,
			// 		poolData,
			// 		sessionData,
			// 		apiQueryString,
			// 		apiRadius,
			// 	};
		}
	} catch (e) {
		throw e;
	}
};

const PlaceService = {
	showResults,
};

module.exports = PlaceService;
