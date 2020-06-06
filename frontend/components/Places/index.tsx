import ShareJoinUrl from './Share';
import { useEffect, useReducer, useState } from 'react';
import { request } from '../util';
import getBrowserFingerprint from '../../utils/fingerprint';
import ShowPoolStats from './PoolStats';
import PlaceResults from './PlaceResults';

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
	const [isUpdating, setIsUpdating] = useState(false);
	const [editMode, setEditMode] = useState(false);

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

	// will run on first render, and whenever isUpdating changes from true to false
	useEffect(() => {
		if (!isUpdating) fetchData();
	}, [isUpdating]);

	if (state.loading === true) {
		return <p>Loading...</p>;
	} else {
		const {
			poolData: { _id, maxPoolSize, currPoolSize },
			placeData,
		} = state;
		return (
			<>
				{maxPoolSize !== currPoolSize && <ShareJoinUrl poolId={_id} />}
				<ShowPoolStats
					{...{ parentState: state, isUpdating, setIsUpdating, editMode, setEditMode }}
				/>
				{!editMode && maxPoolSize === currPoolSize && <PlaceResults {...{ placeData }} />}
			</>
		);
	}
};

export default resultPage;
