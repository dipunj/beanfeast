import { useContext, useEffect, useReducer } from 'react';
import { OutlinedInput, Grid, Slider, Typography, Button, LinearProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import useStyles from './styles';
import { SessionCtx } from '../../../components/Context';
import { TimePicker, DatePicker, Notification, request } from '../../util';
import getBrowserFingerprint from '../../../utils/fingerprint';

const initialState = {
	date: new Date(),
	fromTime: new Date(),
	toTime: new Date(),
	headCount: 4,
	location: null,
	loadingLocation: true,
	permissionError: null,
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
		case 'setPermissionError':
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
					permissionError: { title, message },
					loadingLocation: false,
				};
			} else {
				return { ...state, permissionError: null, loadingLocation: false };
			}
		default:
			throw new Error('Unexpected action');
	}
};

const createNewPool = () => {
	const { container } = useStyles();
	const router = useRouter();
	const { context, setContext } = useContext(SessionCtx);
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleClose = (e, reason?) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch({ type: 'setPermissionError' });
	};

	const handleSubmit = async () => {
		// transform data
		const { date, fromTime: from, toTime: to, headCount, location } = state;
		const uniqueIdentifier = await getBrowserFingerprint();
		const d = date?.getDate();
		const m = date?.getMonth();
		const y = date?.getFullYear();
		const fromTime = new Date(y, m, d, from?.getHours(), from?.getMinutes());
		const toTime = new Date(y, m, d, to?.getHours(), to?.getMinutes());

		const params = {
			fromTime,
			toTime,
			maxPeople: headCount,
			...location,
			uniqueIdentifier,
		};
		try {
			const {
				status,
				data: {
					data: { sessionData, poolData },
				},
			} = await request.post('http://localhost:4000/pool/new', {
				...params,
			});
			if (status === 200) {
				router.push(`/place/[poolId]`, `/place/${poolData._id}`);
			}
		} catch (error) {
			console.error(error);
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
		<>
			<Grid container className={container} spacing={4}>
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
							setSelectedDate: (date: Date) =>
								dispatch({ type: 'setFromTime', date }),
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
				<Grid item xs={12}>
					<Typography id="headCount-slider" color="secondary">
						Head Count? (including you)
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8} lg={10}>
					<Slider
						value={state.headCount}
						onChange={(_, headCount) => dispatch({ type: 'setHeadCount', headCount })}
						aria-labelledby="headCount-slider"
						valueLabelDisplay="auto"
						step={1}
						min={1}
						max={process.env.MAX_POOL_SIZE || 10}
						valueLabelDisplay="on"
					/>
				</Grid>
				<Grid item xs={12} sm={4} lg={2}>
					<OutlinedInput
						fullWidth
						value={state.headCount}
						margin="none"
						onChange={({ target: { value: headCount } }) =>
							dispatch({ type: 'setHeadCount', headCount })
						}
						// onBlur={handleBlur}
						inputProps={{
							step: 1,
							min: 1,
							max: process.env.MAX_POOL_SIZE || 10,
							type: 'number',
							'aria-labelledby': 'headCount-slider',
							style: { textAlign: 'center' },
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
						}}
						// style={{ color: 'white', background: theme.palette.warning.main }}
					>
						Create Pool
					</Button>
					{state.loadingLocation && (
						<Grid item xs={12}>
							<LinearProgress style={{ width: '100%' }} color="primary" />
							<Typography color="secondary" align="center">
								Acquiring GPS
							</Typography>
						</Grid>
					)}
				</Grid>
			</Grid>
			<Notification
				{...{
					isOpen: state.permissionError !== null,
					handleClose,
					title: state.permissionError?.title,
					message: state.permissionError?.message,
					type: 'error',
				}}
			/>
		</>
	);
};

export default createNewPool;
