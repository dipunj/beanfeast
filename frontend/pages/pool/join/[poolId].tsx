import JoinPool from '../../../components/Pool/join';

export const getServerSideProps = async ({ req, res, query }) => {
	return { props: { poolId: query.poolId } };
};

export default JoinPool;
