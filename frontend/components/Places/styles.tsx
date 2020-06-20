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
	flex-grow: 1;
`;

const Content = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: stretch;
`;

export { Container, Header, Content };
