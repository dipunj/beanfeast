var axios = require('axios');
var PoolService = require('./pool.service.js');
// var { GoogleStates, AppStates } = require('../constants/states.constants');
var API = require('../constants/apis.constants');
var preprocess = require('../util/preprocess.util');

const _apiSelector = () => {
	return API.TOM_TOM;
};

const _generateAPIParams = (apiName, { queryString, centroid: { lat, lon }, radius }) => {
	switch (apiName) {
		case API.TOM_TOM.apiName:
			return {
				targetUrl: `${API.TOM_TOM.apiUrl}/${queryString}.json`,
				apiParams: {
					key: process.env.TOMTOM_API_KEY,
					lat: parseFloat(lat),
					lon: parseFloat(lon),
					radius: Math.max(radius, process.env.defaultSearchRadius) || 2000,
					idxSet: 'POI',
					minFuzzyLevel: 1,
					maxFuzzyLevel: 4,
					limit: 100,
				},
			};

		case API.GOOGLE.apiName:
			// Google sucks here, GCP just won't accept the same indian debit card which AWS accepted without question
			// hence not using Google maps api, instead using tomtom api which sucks, but good enough for demonstration purposes very competetive results
			return {
				targetUrl: API.GOOGLE.apiUrl,
				apiParams: {
					key: process.env.GOOGLE_API_KEY,
					keyword: queryString,
					location: `${lat},${lon}`,
					radius: Math.max(radius, process.env.defaultSearchRadius) || 2000,
				},
			};
		default:
			throw new Error('Invalid API selected');
	}
};

const _getPlaces = async (params, { queryString, searchRadius }, ...rest) => {
	const { poolData } = params;

	const { apiName, apiMaxRating } = _apiSelector();

	const { apiParams, targetUrl } = _generateAPIParams(apiName, {
		queryString,
		centroid: {
			lat: poolData.centroidLatitude,
			lon: poolData.centroidLongitude,
		},
		radius: searchRadius,
	});

	try {
		const places = await axios.get(targetUrl, {
			crossDomain: true,
			params: apiParams,
		});

		return {
			places: preprocess(places.data, apiName),
			api: {
				name: apiName,
				radius: searchRadius,
				queryString,
				maxRating: apiMaxRating,
			},
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
			const { places, api } = await _getPlaces({ poolData }, searchParams);

			return {
				poolData,
				sessionData,
				poolMembersLocation,
				api,
				placesData: places,
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
