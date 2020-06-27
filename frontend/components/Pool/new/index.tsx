import { useEffect, useReducer, useState } from 'react';
import { Grid, Typography, Button, LinearProgress, Paper } from '@material-ui/core';
import { useRouter } from 'next/router';
import useStyles from './styles';
import { Request, TimePicker, DatePicker } from '../../util';
import getBrowserFingerprint from '../../../utils/fingerprint';
import mergeDateTime from '../../../utils/mergeDateTime';
import HeadCount, { HeadCountLabel } from './HeadCount';
import Toast from '../../util/Toast';

const initialState = {
	date: new Date(),
	fromTime: new Date(),
	toTime: new Date(),
	headCount: 4,
	location: null,
	apiUnderProgress: false,
	loadingLocation: true,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'setDate':
			return { ...state, date: action.date };
		case 'setFromTime':
			return { ...state, fromTime: action.date };
		case 'setToTime':
			return { ...state, toTime: action.date };
		case 'setHeadCount':
			return { ...state, headCount: action.headCount };
		case 'setLocation':
			return { ...state, loadingLocation: false, location: { ...action.location } };
		case 'setApiUnderProgress':
			return { ...state, apiUnderProgress: action.apiUnderProgress };
		case 'setPermissionError':
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

const createNewPool = () => {
	const styles = useStyles();
	const router = useRouter();
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleSubmit = async () => {
		dispatch({ type: 'setApiUnderProgress', apiUnderProgress: true });
		// transform data
		const { date, fromTime: from, toTime: to, headCount, location } = state;
		const uniqueIdentifier = await getBrowserFingerprint();
		const { fromTime, toTime } = mergeDateTime(date, from, to);
		const params = {
			fromTime,
			toTime,
			maxPoolSize: headCount,
			...location,
			uniqueIdentifier,
		};
		try {
			const {
				status,
				data: {
					meta,
					data: { sessionData, poolData },
				},
			} = await Request.post('/pool/create/new', {
				...params,
			});
			dispatch({ type: 'setApiUnderProgress', apiUnderProgress: false });
			router.push(`/pool/status/[poolId]`, `/pool/status/${poolData._id}`);
		} catch (error) {
			Toast({ error });
			dispatch({ type: 'setApiUnderProgress', apiUnderProgress: false });
		}
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
				(error) => dispatch({ type: 'setPermissionError', error }),
				{
					maximumAge: 120000,
					timeout: 5000,
					enableHighAccuracy: true,
				}
			);
		}
	}, []);

	return (
		<Grid container direction="row" justify="space-evenly" alignItems="stretch" spacing={4}>
			<Grid item xs={12}>
				<DatePicker
					{...{
						selectedDate: state.date,
						setSelectedDate: (date: Date) => dispatch({ type: 'setDate', date }),
						label: 'Date',
						minDate: new Date(),
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TimePicker
					{...{
						selectedDate: state.fromTime,
						setSelectedDate: (date: Date) => dispatch({ type: 'setFromTime', date }),
						label: 'From',
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TimePicker
					{...{
						selectedDate: state.toTime,
						setSelectedDate: (date: Date) => dispatch({ type: 'setToTime', date }),
						label: 'To',
					}}
				/>
			</Grid>
			<Grid item xs={12} container alignItems="center" spacing={4}>
				<HeadCountLabel />
				<HeadCount
					{...{
						value: state.headCount,
						sliderOnChange: (_: any, headCount: any) =>
							dispatch({ type: 'setHeadCount', headCount }),
						numberOnChange: ({ target: { value: headCount } }) =>
							dispatch({ type: 'setHeadCount', headCount }),
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={8} md={6}>
				<Button
					{...{
						color: 'primary',
						variant: 'outlined',
						fullWidth: true,
						size: 'large',
						variant: 'contained',
						onClick: handleSubmit,
						disabled: state.location === null,
						className: styles.squareButton,
					}}
					// style={{ color: 'white', background: theme.palette.warning.main }}
				>
					Create Pool
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
	);
};

export default createNewPool;
