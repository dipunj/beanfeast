import { useState, useReducer, useEffect } from 'react';
import { Grid, Button, LinearProgress, Typography } from '@material-ui/core';
import Information from './Information';
import useStyles from './styles';
import { NotificationToast, Request } from '../../util';
import getBrowserFingerprint from '../../../utils/fingerprint';
import { useRouter } from 'next/router';
import { handleNotification } from '../../util/NotificationToast';

const initialState = {
	location: null,
	loadingLocation: true,
	apiUnderProgress: false,
	browserError: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'setLocation':
			return { ...state, loadingLocation: false, location: { ...action.location } };
		case 'setApiUnderProgress':
			return { ...state, apiUnderProgress: action.apiUnderProgress };
		case 'setBrowserError':
			let title = '';
			let message = '';
			if (action.hasOwnProperty('error')) {
				switch (action.error.code) {
					case action.error.PERMISSION_DENIED:
						title = 'Permission Error';
						message = 'You denied the request for Geolocation, cannot proceed.';
						break;
					case action.error.POSITION_UNAVAILABLE:
						title = 'Position Unavailable';
						message = 'Location information is unavailable on this device';
						break;
					case action.error.TIMEOUT:
						title = 'Timeout';
						message = 'The request to get user location timed out.';
						break;
					default:
						title = 'Unknown Error';
						message = 'An unknown error occurred.';
						break;
				}
				return {
					...state,
					browserError: { title, message },
					loadingLocation: false,
				};
			} else {
				return { ...state, browserError: null, loadingLocation: false };
			}
		default:
			throw new Error('Unexpected action');
	}
};

const joinPoolById = ({ poolId }) => {
	const styles = useStyles();
	const [state, dispatch] = useReducer(reducer, initialState);
	const [notification, setNotification] = useState(null);
	const router = useRouter();

	const handleClose = (e: any, reason?: string) => {
		if (reason === 'clickaway') return;
		dispatch({ type: 'setBrowserError' });
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				({ coords: { latitude, longitude } }) =>
					dispatch({
						type: 'setLocation',
						location: {
							latitude: latitude.toFixed(7),
							longitude: longitude.toFixed(7),
						},
					}),
				(error) => dispatch({ type: 'setBrowserError', error }),
				{
					maximumAge: 120000,
					timeout: 5000,
					enableHighAccuracy: true,
				}
			);
		}
	}, []);

	const handleSubmit = async () => {
		dispatch({ type: 'setApiUnderProgress', apiUnderProgress: true });
		const uniqueIdentifier = await getBrowserFingerprint();
		const { location } = state;

		try {
			const {
				status,
				data: { meta, data },
			} = await Request.post(`/pool/join/${poolId}`, {
				uniqueIdentifier,
				...location,
			});
			dispatch({ type: 'setApiUnderProgress', apiUnderProgress: false });
			router.push(`/pool/status/[poolId]`, `/pool/status/${poolId}`);
		} catch (error) {
			handleNotification(setNotification, error);
			dispatch({ type: 'setApiUnderProgress', apiUnderProgress: false });
		}
	};

	return (
		<>
			<Grid container direction="column" alignItems="stretch">
				<Grid item>
					<Information />
				</Grid>
				<Grid item container justify="center">
					<Grid item xs={12} sm={8} md={6}>
						<Button
							{...{
								color: 'primary',
								variant: 'outlined',
								fullWidth: true,
								size: 'large',
								variant: 'contained',
								className: styles.squareButton,
								onClick: handleSubmit,
								disabled: state.location === null,
							}}
						>
							Join Pool
						</Button>
						{(state.loadingLocation || state.apiUnderProgress) && (
							<Grid item xs={12}>
								<LinearProgress style={{ width: '100%' }} color="primary" />
								<Typography color="textSecondary" align="center">
									{state.loadingLocation && 'Acquiring GPS'}
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>

			{/* specific for client side error */}
			<NotificationToast
				{...{
					isOpen: state.browserError !== null,
					handleClose,
					title: state.browserError?.title,
					message: state.browserError?.message,
					type: 'error',
				}}
			/>

			{/* specifically for server side errors */}
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
};

export default joinPoolById;
