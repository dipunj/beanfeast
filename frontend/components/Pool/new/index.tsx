import { useState, useEffect } from 'react';
import useStyles from './styles';
import { OutlinedInput, Grid, Slider, Typography, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { TimePicker, DatePicker } from '../../util';
import getFingerprint from '../../../utils/fingerprint';
import { useTheme } from '@material-ui/core';

/**
 form requirements
 * 1. fromTime
 * 2. toTime
 * 3. maxPeople
 * 4. latitude
 * 5. longitude
 * 6. uniqueIdentifier
 */

const createNewPool = () => {
	const { container } = useStyles();

	const [date, setDate] = useState<Date>(new Date());
	const [fromTime, setFromTime] = useState<Date>(new Date());
	const [toTime, setToTime] = useState<Date>(new Date());
	const [headCount, setHeadCount] = useState(4);
	const [location, setLocation] = useState({});

	const [permssionError, setPermissionError] = useState('');

	const handleSliderChange = (e, newValue) => {
		setHeadCount(newValue);
	};

	const handleInputChange = ({ target: { value } }) => {
		setHeadCount(value === '' ? 1 : Number(value));
	};

	const handleBlur = () => {
		if (headCount < 1) {
			setHeadCount(1);
		} else if (headCount > 10) {
			setHeadCount(10);
		}
	};

	const handlePermissionError = (error) => {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				setPermissionError('You denied the request for Geolocation, cannot proceed.');
				break;
			case error.POSITION_UNAVAILABLE:
				setPermissionError('Location information is unavailable on this device');
				break;
			case error.TIMEOUT:
				setPermissionError('The request to get user location timed out.');
				break;
			case error.UNKNOWN_ERROR:
				setPermissionError('An unknown error occurred.');
				break;
		}
	};

	const handleLocation = ({ coords: { latitude, longitude } }) => {
		setLocation({ latitude: latitude.toFixed(5), longitude: longitude.toFixed(5) });
	};

	const handleSubmit = async () => {
		const uniqueIdentifier = await getFingerprint();
		const d = date?.getDate();
		const m = date?.getMonth();
		const y = date?.getFullYear();
		const from_Time = new Date(y, m, d, fromTime?.getHours(), fromTime?.getMinutes());
		const to_Time = new Date(y, m, d, toTime?.getHours(), toTime?.getMinutes());
		console.log(uniqueIdentifier, from_Time, to_Time, headCount, location);
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(handleLocation, handlePermissionError, {
				maximumAge: 60000,
				timeout: 5000,
				enableHighAccuracy: true,
			});
		}
	}, []);

	return (
		<Grid container className={container} spacing={4}>
			<Grid item xs={12}>
				<DatePicker
					{...{
						selectedDate: date,
						setSelectedDate: setDate,
						label: 'Date',
						minDate: new Date(),
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TimePicker
					{...{
						selectedDate: fromTime,
						setSelectedDate: setFromTime,
						label: 'From',
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TimePicker
					{...{
						selectedDate: toTime,
						setSelectedDate: setToTime,
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
					value={typeof headCount === 'number' ? headCount : 4}
					onChange={handleSliderChange}
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
					value={headCount}
					margin="none"
					onChange={handleInputChange}
					onBlur={handleBlur}
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
					}}
					// style={{ color: 'white', background: theme.palette.warning.main }}
				>
					Create Pool
				</Button>
			</Grid>
			<Snackbar open={permssionError !== ''} autoHideDuration={6000}>
				<Alert severity="error">{permssionError}</Alert>
			</Snackbar>
		</Grid>
	);
};

export default createNewPool;
