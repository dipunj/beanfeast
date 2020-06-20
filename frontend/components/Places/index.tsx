import { useState, useEffect } from 'react';
import getBrowserFingerprint from '../../utils/fingerprint';
import Request from '../util/Request';
import CardsAndMap from './CardsAndMap';

const PlaceResults = ({ poolId }) => {
	const [data, setData] = useState(null);
	const fetchData = async () => {
		try {
			const uniqueIdentifier = await getBrowserFingerprint();
			const {
				data: { meta, data },
			} = await Request.get(`/place/results/${poolId}`, {
				params: {
					uniqueIdentifier,
				},
			});
			setData(data);
		} catch (error) {
			console.log(error);
			// handleNotification(setNotification, error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (!data) return <div>loading...</div>;
	else return <CardsAndMap {...{ data }} />;
};

export default PlaceResults;
