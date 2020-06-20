import { useState, useEffect } from 'react';
import getBrowserFingerprint from '../../utils/fingerprint';
import Request from '../util/Request';
import CardsAndMap from './CardsAndMap';
import Controls from './Controls';
import { Header, Container, Content } from './styles';

const PlaceResults = ({ poolId }) => {
	const [data, setData] = useState(null);

	const fetchData = async (query, radius) => {
		try {
			const uniqueIdentifier = await getBrowserFingerprint();
			const {
				data: { meta, data },
			} = await Request.get(`/place/results/${poolId}`, {
				params: {
					uniqueIdentifier,
					queryString: query,
					searchRadius: radius,
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
	else
		return (
			<Container>
				<Header>
					<Controls {...{ data, reRequest: fetchData }} />
				</Header>
				<Content>
					<CardsAndMap {...{ data }} />
				</Content>
			</Container>
		);
};

export default PlaceResults;
