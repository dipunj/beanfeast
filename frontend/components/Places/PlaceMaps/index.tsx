import { Map, TileLayer, Marker, Popup, Circle, Polygon, CircleMarker } from 'react-leaflet';
import { Typography } from '@material-ui/core';

const ToolTip = ({ title, details }) => (
	<Popup>
		<Typography variant="subtitle1">{title}</Typography>
		<Typography variant="caption">{details}</Typography>
	</Popup>
);

const MapView = ({ center, searchRadius, peerPositions, resultPositions, handleFocus }) => {
	return (
		<Map center={center} zoom={17}>
			<TileLayer
				// attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Circle center={center} color="red" radius={searchRadius} />
			<Polygon color="lime" positions={peerPositions} />
			{resultPositions.map(({ id, pos, title, details }) => (
				<Marker position={pos} onClick={() => handleFocus(id)}>
					<ToolTip {...{ title, details }} />
				</Marker>
			))}
			{peerPositions.map((pos) => (
				<CircleMarker center={pos} color="black" radius={5}>
					<Popup>{JSON.stringify(pos)}</Popup>
				</CircleMarker>
			))}
		</Map>
	);
};

export default MapView;
