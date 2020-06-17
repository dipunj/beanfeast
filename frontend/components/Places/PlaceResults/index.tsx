import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import getBrowserFingerprint from '../../../utils/fingerprint';
import Request from '../../util/Request';
import PlacesCard from '../PlaceCard';
import { Header, Container, Content, MapContainer, DetailsContainer } from './styles';

// leaflet doesn't support ssr
const MapView = dynamic(import('../PlaceMaps'), {
	ssr: false,
	loading: () => <div style={{ textAlign: 'center', paddingTop: 20 }}>Chargement…</div>,
});

const PlaceResults = ({ poolId }) => {
	const [data, setData] = useState(null);
	const fetchData = async () => {
		try {
			const uniqueIdentifier = await getBrowserFingerprint();
			console.log(uniqueIdentifier);
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
				id,
				poi: { name, phone, categories },
				score,
				address: { freeformAddress: address },
				position,
			} = itm;
			return (
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
			);
		});
		return (
			<Container>
				<Header>Hello</Header>
				<Content>
					<MapContainer className="leaflet-container">
						<MapView
							center={[
								data.poolData.centroidLatitude.$numberDecimal,
								data.poolData.centroidLongitude.$numberDecimal,
							]}
							searchRadius={data.apiRadius}
							peerPositions={data.poolMembersLocation}
							resultPositions={data?.placesData?.results?.map(
								({ position: { lat, lon } }) => [lat, lon]
							)}
						/>
					</MapContainer>
					<DetailsContainer>{cards}</DetailsContainer>
				</Content>
			</Container>
		);
	}
};

export default PlaceResults;
