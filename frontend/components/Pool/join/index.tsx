import { useState, useReducer, useEffect } from 'react';
import { Grid, Button, LinearProgress, Typography } from '@material-ui/core';
import Information from './Information';
import useStyles from './styles';
import { NotificationToast, Request } from '../../util';
import getBrowserFingerprint from '../../../utils/fingerprint';
import { useRouter } from 'next/router';
import Toast from '../../util/Toast';

const initialState = {
	location: null,
	loadingLocation: true,
	apiUnderProgress: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'setLocation':
			return { ...state, loadingLocation: false, location: { ...action.location } };
		case 'setApiUnderProgress':
			return { ...state, apiUnderProgress: action.apiUnderProgress };
		case 'showBrowserError':
			if (action.hasOwnProperty('error')) {
				switch (action.error.code) {
					case action.error.PERMISSION_DENIED:
						Toast({
							title: 'Permission Error',
							message: 'You denied the request for Geolocation, cannot proceed.',
							type: 'error',
						});
						break;
					case action.error.POSITION_UNAVAILABLE:
						Toast({
							title: 'Position Unavailable',
							message: 'Location information is unavailable on this device',
							type: 'error',
						});
						break;
					case action.error.TIMEOUT:
						Toast({
							title: 'Timeout',
							message: 'The request to get user location timed out.',
							type: 'error',
						});
						break;
					default:
						Toast({
							title: 'Unknown Error',
							message: 'An unknown error occurred.',
							type: 'error',
						});
						break;
				}
			}
			return { ...state, loadingLocation: false };
		default:
			throw new Error('Unexpected action');
	}
};

const joinPoolById = ({ poolId }) => {
	const styles = useStyles();
	const [state, dispatch] = useReducer(reducer, initialState);
	const router = useRouter();

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
				(error) => dispatch({ type: 'showBrowserError', error }),
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
			Toast({ error });
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
		</>
	);
};

export default joinPoolById;
