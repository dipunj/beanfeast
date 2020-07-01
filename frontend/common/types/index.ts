export interface resultResponse {
	poolData: {
		fromTime: string;
		toTime: string;
		maxPoolSize: number;
		currPoolSize: number;
		_id: string;
		createdBy: string;
		centroidLatitude: {
			$numberDecimal: string;
		};
		centroidLongitude: {
			$numberDecimal: string;
		};
	};
	sessionData: {
		_id: string;
		poolId: string;
		uniqueIdentifier: string;
		latitude: {
			$numberDecimal: string;
		};
		longitude: {
			$numberDecimal: string;
		};
		createdAt: string;
		updatedAt: string;
	};
	poolMembersLocation: number[][];
	api: {
		name: string;
		radius: number;
		query: string;
		maxRating: number;
	};
	placesData: {
		id: string;
		name: string;
		phone?: string;
		categories: string[];
		fullAddress: string;
		shortAddress: string;
		rating: number;
		position: {
			lat: number;
			lon: number;
		};
	}[];
}

export interface errored {
	type: string;
	response?: {
		data: {
			meta: {
				response: {
					title: string;
					message: string;
				};
			};
		};
	};
}

export type coordinate = string[];
