import resultPage from '../../components/Places';

resultPage.getInitialProps = async ({ req, res, query }) => {
	return { poolId: query.poolId };
};
export default resultPage;
