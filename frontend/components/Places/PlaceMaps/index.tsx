import { Map, TileLayer, Marker, Popup, Circle, Polygon, CircleMarker } from 'react-leaflet';

const MapView = ({ center, searchRadius, peerPositions, resultPositions }) => {
	return (
		<Map center={center} zoom={17}>
			<TileLayer
				// attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Circle center={center} color="red" radius={searchRadius} />
			<Polygon color="lime" positions={peerPositions} />
			{resultPositions.map((pos) => (
				<Marker position={pos} />
			))}
			{peerPositions.map((pos) => (
				<CircleMarker center={pos} color="black" radius={5} />
			))}
		</Map>
	);
};

export default MapView;
