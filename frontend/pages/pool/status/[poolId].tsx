import { showPool } from '../../../components/Pool/index';

export const getServerSideProps = async ({ req, res, query }) => {
	return { props: { poolId: query.poolId } };
};

export default showPool;
