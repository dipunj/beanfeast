import ShareJoinUrl from './Share';
import { useEffect, useReducer, useState } from 'react';
import { Request } from '../../util';
import getBrowserFingerprint from '../../../common/utils/fingerprint';
import ShowPoolStats from './PoolStats';
import { Toast } from '../../util';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import Loader from '../../Loader';
import { RedirectButtons } from '../../util';

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
				success: action.meta.success,
				sessionData: action.data.sessionData,
				poolData: action.data.poolData,
				placeData: action.data.placeData,
			};
		default:
			return state;
	}
};

const statusPage = ({ poolId }) => {
	const router = useRouter();
	const [state, dispatch] = useReducer(reducer, initialState);
	const [isUpdating, setIsUpdating] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const routeToResultsPage = () => {
		router.push('/place/results/[poolId]', `/place/results/${poolId}`);
	};

	const fetchData = async () => {
		try {
			const uniqueIdentifier = await getBrowserFingerprint();

			const {
				data: { meta, data },
			} = await Request.get(`/pool/status/${poolId}`, {
				params: {
					uniqueIdentifier,
				},
			});
			dispatch({ type: 'update', data, meta });
		} catch (error) {
			const { meta } = error.response.data;
			Toast({ error });
			dispatch({ type: 'update', data: {}, meta });
		}
	};

	// will run on first render, and whenever isUpdating changes from true to false
	useEffect(() => {
		if (!isUpdating) fetchData();
	}, [isUpdating]);

	if (state.loading === true) {
		return <Loader />;
	} else {
		const { success } = state;
		if (!success) {
			return <RedirectButtons />;
		}

		const {
			poolData: { _id, maxPoolSize, currPoolSize },
		} = state;
		return (
			<>
				{maxPoolSize !== currPoolSize && <ShareJoinUrl poolId={_id} />}
				<ShowPoolStats
					{...{ parentState: state, isUpdating, setIsUpdating, editMode, setEditMode }}
				/>
				{!editMode && maxPoolSize === currPoolSize && (
					<Button onClick={routeToResultsPage}>View Results</Button>
				)}
			</>
		);
	}
};

export default statusPage;
