import { Map, TileLayer, Marker, Popup, Circle, Polygon, CircleMarker } from 'react-leaflet';
import { Typography } from '@material-ui/core';

const MapView = ({ center, searchRadius, peerPositions, resultPositions, handleFocus }) => {
	return (
		<Map id="map-id" center={center} zoom={17}>
			<TileLayer
				// attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Circle center={center} color="red" radius={searchRadius} />
			<Polygon color="lime" positions={peerPositions} />
			{resultPositions.map(({ id, pos, tooltipComponent, popUpProps }) => (
				<Marker id={id} key={id} position={pos} onClick={() => handleFocus(id)}>
					<Popup {...popUpProps}>{tooltipComponent}</Popup>
				</Marker>
			))}
			{peerPositions.map((pos) => (
				<CircleMarker id={pos} key={pos} center={pos} color="black" radius={5}>
					<Popup>{JSON.stringify(pos)}</Popup>
				</CircleMarker>
			))}
		</Map>
	);
};

export default MapView;
