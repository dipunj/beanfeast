import resultPage from '../../components/Places';

export const getServerSideProps = async ({ req, res, query }) => {
	return { props: { poolId: query.poolId } };
};

export default resultPage;
