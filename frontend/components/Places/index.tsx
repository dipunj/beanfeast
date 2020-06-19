import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import getBrowserFingerprint from '../../utils/fingerprint';
import Request from '../util/Request';
import PlacesCard from './PlaceCard';
import { Header, Container, Content, MapContainer, DetailsContainer } from './styles';
import sortHullOrder from '../../utils/hull';
import { setSeconds } from 'date-fns';

// leaflet doesn't support ssr
const MapView = dynamic(import('./PlaceMaps'), {
	ssr: false,
	loading: () => <div style={{ textAlign: 'center', paddingTop: 20 }}>Loading Map...</div>,
});

const PlaceResults = ({ poolId }) => {
	const [data, setData] = useState(null);
	const [focused, setFocused] = useState(null);

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
		const cards = data.placesData.results.map(
			({
				id,
				poi: { name, phone, categories },
				score,
				address: { freeformAddress: address },
				position,
			}) => (
				<PlacesCard
					{...{
						id,
						name,
						rating: ((5 * parseFloat(score)) / 100).toFixed(2).toString(),
						address,
						position,
						tags: categories,
					}}
				/>
			)
		);

		const resultPositions = data?.placesData?.results?.map(
			({
				id,
				position: { lat, lon },
				poi: { name: title },
				address: { streetName: details },
			}) => ({
				id,
				pos: [lat, lon],
				title,
				details,
			})
		);

		const center = [
			data.poolData.centroidLatitude.$numberDecimal,
			data.poolData.centroidLongitude.$numberDecimal,
		];

		const peerPositions = sortHullOrder(data.poolMembersLocation);
		const searchRadius = data.apiRadius;

		const handleFocus = (id) => setFocused(id);

		return (
			<Container>
				<Header>Hello</Header>
				<Content>
					<MapContainer className="leaflet-container">
						<MapView
							{...{
								center,
								searchRadius,
								peerPositions,
								resultPositions,
								handleFocus,
							}}
						/>
					</MapContainer>
					<DetailsContainer>{cards}</DetailsContainer>
				</Content>
			</Container>
		);
	}
};

export default PlaceResults;
