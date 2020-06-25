import styled from 'styled-components';

const MapContainer = styled.div`
	width: ${({ isMobile }) => (isMobile ? '100%' : '80%')};
	border-radius: 10px;
	padding: 16px;
	background: transparent;
	/* border: 1px solid lightgray; */
	& .leaflet-container {
		border-radius: 16px;
		border: 1px solid lightgray;
		height: 100%;
	}
`;

const DetailsContainer = styled.div`
	overflow-y: auto;
	/* height: 75vh; */
	/* width: 25%; */
	height: calc(85vh - 100px);
	width: 20%;
	position: fixed;
	right: 8px;
	top: 15vh;
	border-radius: 10px;
	border: 1px solid lightgray;
	margin-top: 16px;
`;

export { MapContainer, DetailsContainer };
