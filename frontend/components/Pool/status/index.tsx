import ShareJoinUrl from './Share';
import { useEffect, useReducer, useState } from 'react';
import { Request, NotificationToast } from '../../util';
import getBrowserFingerprint from '../../../utils/fingerprint';
import ShowPoolStats from './PoolStats';
import { handleNotification } from '../../util/NotificationToast';
import { Button } from '@material-ui/core';

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
	const [state, dispatch] = useReducer(reducer, initialState);
	const [isUpdating, setIsUpdating] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [notification, setNotification] = useState(null);

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
			handleNotification(setNotification, error);
			dispatch({ type: 'update', data: {}, meta });
		}
	};

	// will run on first render, and whenever isUpdating changes from true to false
	useEffect(() => {
		if (!isUpdating) fetchData();
	}, [isUpdating]);

	if (state.loading === true) {
		return <p>Loading...</p>;
	} else {
		const { success } = state;
		if (!success) {
			return (
				<>
					<p>Create a new pool</p>
					<NotificationToast
						{...{
							isOpen: notification !== null,
							title: notification?.title,
							message: notification?.message,
							type: notification?.type,
							setNotification,
						}}
					/>
				</>
			);
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
				{!editMode && maxPoolSize === currPoolSize && <Button>View Results</Button>}
				<NotificationToast
					{...{
						isOpen: notification !== null,
						title: notification?.title,
						message: notification?.message,
						type: notification?.type,
						setNotification,
					}}
				/>
			</>
		);
	}
};

export default statusPage;
