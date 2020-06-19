import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	width: 100vw;
	height: 80vh;
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-grow: 0;
`;

const Content = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

const MapContainer = styled.div`
	width: 75%;
	height: 100%;
	& .leaflet-container {
		height: 100%;
	}
`;

const DetailsContainer = styled.div`
	overflow-y: auto;
	height: 80vh;
	width: 25%;
`;

export { Container, Header, Content, MapContainer, DetailsContainer };
