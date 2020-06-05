import ShareJoinUrl from './Share';
import { useEffect, useReducer, useState } from 'react';
import { request } from '../util';
import getBrowserFingerprint from '../../utils/fingerprint';
import ShowPoolStats from './PoolStats';
import { Divider } from '@material-ui/core';

const initialState = {
	loading: true,
	sessionData: {},
	poolData: {},
	placeData: {},
};

const reducer = (state, action: any) => {
	switch (action.type) {
		case 'update':
			return {
				loading: false,
				sessionData: action.data.sessionData,
				poolData: action.data.poolData,
				placeData: action.data.placeData,
			};
		default:
			return state;
	}
};

const resultPage = ({ poolId }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [edit, setEdit] = useState(false);

	const fetchData = async () => {
		try {
			const uniqueIdentifier = await getBrowserFingerprint();
			const { data } = await request.get(`http://localhost:4000/pool/show`, {
				params: {
					poolId,
					uniqueIdentifier,
				},
			});
			dispatch({ type: 'update', data });
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchData();
	}, [edit]);

	if (state.loading === true) {
		return <p>Loading...</p>;
	} else {
		const {
			poolData: { _id, maxPoolSize, currPoolSize },
		} = state;
		return (
			<>
				{maxPoolSize !== currPoolSize && <ShareJoinUrl poolId={_id} />}
				<Divider variant="middle" orientation="horizontal" />
				<ShowPoolStats {...{ parentState: state, edit, setEdit }} />
				{!edit && maxPoolSize === currPoolSize && <p>show results here</p>}
			</>
		);
	}
};

export default resultPage;
