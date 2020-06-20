import { useState, createRef } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, DetailsContainer } from './styles';
import PlacesCard from '../PlaceCard';
import sortHullOrder from '../../../utils/hull';

// leaflet doesn't support ssr
const MapView = dynamic(import('../PlaceMaps'), {
	ssr: false,
	loading: () => <div style={{ textAlign: 'center', paddingTop: 20 }}>Loading Map...</div>,
});

interface resultResponse {
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

const CardsAndMap = ({ data }: { data: resultResponse }) => {
	const [selected, setSelected] = useState('');

	const refList: any = data.placesData.reduce((acc, { id }) => {
		acc[id] = createRef();
		return acc;
	}, {});

	const handleFocus = (id: string) => {
		refList[id].current.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
		setSelected(id);
	};

	const cards = data.placesData.map(
		({ id, name, phone, categories, rating, fullAddress, shortAddress, position }) => (
			<PlacesCard
				{...{
					id,
					refptr: refList[id],
					api: data.api,
					name,
					phone,
					isFocused: selected === id,
					rating: ((5 * rating) / data.api.maxRating).toFixed(2).toString(),
					fullAddress,
					shortAddress,
					position,
					tags: categories,
				}}
			/>
		)
	);

	const resultPositions = data.placesData.map(
		({ id, position: { lat, lon }, name: title, shortAddress }) => ({
			id,
			pos: [lat, lon],
			title,
			details: shortAddress,
			ref: refList[id],
		})
	);

	const center = [
		data.poolData.centroidLatitude.$numberDecimal,
		data.poolData.centroidLongitude.$numberDecimal,
	];

	const peerPositions = sortHullOrder(data.poolMembersLocation);
	const searchRadius = data.api.radius;

	return (
		<>
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
		</>
	);
};

export default CardsAndMap;
