import PlaceResults from '../../../components/Places/PlaceResults';

export const getServerSideProps = async ({ query }) => {
	return { props: { poolId: query.poolId } };
};

export default PlaceResults;
