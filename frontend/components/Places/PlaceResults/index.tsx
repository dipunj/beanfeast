import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Button } from '@material-ui/core';
import { Container, Header, Content, MapContainer, DetailsContainer } from './styles';
import { useEffect, useState } from 'react';
import getBrowserFingerprint from '../../../utils/fingerprint';
import { handleNotification } from '../../util/NotificationToast';
import Request from '../../util/Request';

const libraries = ['places'];
const containerStyle = {
	width: '100%',
	height: '100%',
};
const center = { lat: -43.653225, lng: -79.383186 };

const PlaceResults = ({ poolId }) => {
	const [loading, setLoading] = useState(true);
	const [browserFP, setBrowserFP] = useState(null);
	const [notification, setNotification] = useState(null);
	const [data, setData] = useState({ poolData: {}, sessionData: {}, placesData: {} });

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_REACT_GOOGLE_API_KEY,
		libraries,
	});

	const fetchData = async () => {
		const uniqueIdentifier = await getBrowserFingerprint();

		try {
			const {
				data: { meta, data },
			} = await Request.post(`/place/status/${poolId}`, {
				uniqueIdentifier,
			});
			setData(data);
		} catch (error) {
			handleNotification(setNotification, error);
		}
	};

	useEffect(() => {
		fetchData(setData, setNotification);
	}, []);

	const redirectToModifyPage = () => {};

	if (!isLoaded || loading) {
		return <p>Loading...</p>;
	}
	if (loadError) {
		return <p>{loadError}</p>;
	}

	return (
		<Container>
			<Header>
				<Button fullWidth onClick={redirectToModifyPage}>
					Change Pool Settings
				</Button>
			</Header>
			<Content>
				<MapContainer>
					<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
						{/* <Marker position={center} /> */}
					</GoogleMap>
				</MapContainer>
				<DetailsContainer>show map data here</DetailsContainer>
			</Content>
		</Container>
	);
};

export default PlaceResults;
