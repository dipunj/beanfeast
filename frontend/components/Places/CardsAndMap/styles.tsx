import styled from 'styled-components';

const MapContainer = styled.div`
	width: ${(props) => (props.isMobile ? '80%' : '100%')};
	/* width: 80%; */
	& .leaflet-container {
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
`;

export { MapContainer, DetailsContainer };
