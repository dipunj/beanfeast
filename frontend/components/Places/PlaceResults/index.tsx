import { useState, useEffect } from 'react';
import getBrowserFingerprint from '../../../utils/fingerprint';
import Request from '../../util/Request';
import PlacesCard from '../PlaceCard';

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

	if (!data) {
		return <div>loading...</div>;
	} else {
		const cards = data.placesData.results.map((itm) => {
			const {
				poi: { name, phone, categories },
				score,
				address: { freeformAddress: address },
				position,
			} = itm;
			return (
				<PlacesCard
					{...{
						name,
						rating: ((5 * parseFloat(score)) / 100).toFixed(2).toString(),
						address,
						position,
						tags: categories,
					}}
				/>
			);
		});

		return <>{cards}</>;
	}
};

export default PlaceResults;
