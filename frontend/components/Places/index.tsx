import { useState, useEffect } from 'react';
import getBrowserFingerprint from '../../utils/fingerprint';
import Request from '../util/Request';
import CardsAndMap from './CardsAndMap';
import Controls from './Controls';
import { Footer, Container, Content } from './styles';
import defaultGetLayout from '../Layouts/NextLayout';
import { useMediaQuery } from '@material-ui/core';
import Loader from '../Loader';
import { Toast, RedirectButtons } from '../util';

const PlaceResults = ({ poolId }) => {
	const isMobile = useMediaQuery('(max-width:500px)');
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [uid, setUid] = useState(null);

	const fetchData = async (query, radius) => {
		try {
			const uniqueIdentifier = await getBrowserFingerprint();
			setUid(uniqueIdentifier);
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
			setLoading(false);
		} catch (error) {
			Toast({ error });
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) return <Loader />;
	else if (!loading && !data) return <RedirectButtons />;
	else {
		const isAdmin = data.poolData.createdBy === uid;
		return (
			<Container>
				<Content>
					<CardsAndMap {...{ isMobile, data }} />
				</Content>
				<Footer>
					<Controls {...{ isAdmin, data, reRequest: fetchData }} />
				</Footer>
			</Container>
		);
	}
};

PlaceResults.getLayout = (page) => defaultGetLayout(page, { height: '15vh' });

export default PlaceResults;
