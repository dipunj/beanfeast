import PlaceResults from '../../../components/Places';

export const getServerSideProps = async ({ query }) => {
	return { props: { poolId: query.poolId } };
};

export default PlaceResults;
