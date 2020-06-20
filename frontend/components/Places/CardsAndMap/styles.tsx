import styled from 'styled-components';

const MapContainer = styled.div`
	width: 75%;
	& .leaflet-container {
		height: 100%;
	}
`;

const DetailsContainer = styled.div`
	overflow-y: auto;
	height: 70vh;
	width: 25%;
`;

export { MapContainer, DetailsContainer };
