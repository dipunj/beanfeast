import { useState, createRef } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, DetailsContainer } from './styles';
import PlacesCard from '../PlaceCard';
import sortHullOrder from '../../../common/utils/hull';
import ToolTip from '../ToolTip';
import { coordinate, resultResponse } from '../../../common/types';

// leaflet doesn't support ssr
const MapView = dynamic(import('../PlaceMaps'), {
	ssr: false,
	loading: () => <div style={{ textAlign: 'center', paddingTop: 20 }}>Loading Map...</div>,
});

const MobileVersion = ({
	center,
	peerPositions,
	searchRadius,
	data,
}: {
	center: coordinate;
	peerPositions: coordinate[];
	searchRadius: number;
	data: resultResponse;
}) => {
	const handleFocus = () => {};
	const resultPositions = data.placesData.map(
		({ id, position: { lat, lon }, name: title, shortAddress }) => ({
			id,
			pos: [lat, lon],
			toolTipComponent: (
				<ToolTip
					{...{
						title,
						details: shortAddress,
						showIcon: true,
						handleOpen: () => {
							// window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`);
							window.open(
								`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving&layer=traffic`
							);
						},
					}}
				/>
			),
		})
	);

	return (
		<MapContainer isMobile className="leaflet-container">
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
	);
};

const DesktopVersion = ({
	center,
	peerPositions,
	searchRadius,
	data,
}: {
	center: coordinate;
	peerPositions: coordinate[];
	searchRadius: number;
	data: resultResponse;
}) => {
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
					rating: parseFloat(((5 * rating) / data.api.maxRating).toFixed(2)),
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
			toolTipComponent: <ToolTip {...{ title, details: shortAddress }} />,
		})
	);

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

const CardsAndMap = ({ isMobile, data }: { isMobile: boolean; data: resultResponse }) => {
	const dataProps = {
		center: [
			data.poolData.centroidLatitude.$numberDecimal,
			data.poolData.centroidLongitude.$numberDecimal,
		],

		peerPositions: sortHullOrder(data.poolMembersLocation),
		searchRadius: data.api.radius,
	};

	return isMobile ? (
		<MobileVersion
			{...{
				data,
				...dataProps,
			}}
		/>
	) : (
		<DesktopVersion
			{...{
				data,
				...dataProps,
			}}
		/>
	);
};

export default CardsAndMap;
