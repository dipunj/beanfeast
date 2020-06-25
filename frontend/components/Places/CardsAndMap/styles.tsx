import styled from 'styled-components';

const MapContainer = styled.div`
	width: ${({ isMobile }) => (isMobile ? '100%' : '80%')};
	border-radius: 10px;
	padding: 16px;
	background: transparent;
	/* border: 1px solid lightgray; */
	& .leaflet-container {
		border-radius: 16px;
		border: 1px solid grey;
		height: 100%;
	}
`;

const DetailsContainer = styled.div`
	overflow-y: auto;
	/* height: 75vh; */
	/* width: 25%; */
	height: 100%;
	width: 20%;
	position: fixed;
	right: 0px;
	top: 15vh;
	padding-bottom: 200px;
	border-radius: 10px;
	border: 1px solid grey;
	margin-top: 16px;
`;

export { MapContainer, DetailsContainer };
