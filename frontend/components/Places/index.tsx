import { useState, useEffect } from 'react';
import getBrowserFingerprint from '../../utils/fingerprint';
import Request from '../util/Request';
import CardsAndMap from './CardsAndMap';
import Controls from './Controls';
import { Header, Container, Content } from './styles';
import defaultGetLayout from '../Layouts/NextLayout';
import { useMediaQuery } from '@material-ui/core';

const PlaceResults = ({ poolId }) => {
	const isMobile = useMediaQuery('(max-width:500px)');
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
				<Content>
					<CardsAndMap {...{ isMobile, data }} />
				</Content>
				<Header>
					<Controls {...{ isMobile, data, reRequest: fetchData }} />
				</Header>
			</Container>
		);
};

PlaceResults.getLayout = (page) => defaultGetLayout(page, { height: '15vh' });

export default PlaceResults;
