import Header from '../Layouts/Header';
import {
	MuiPickersUtilsProvider,
	TimePicker as MuiTimePicker,
	DatePicker as MuiDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Grid, Snackbar, Button, Slide } from '@material-ui/core';
import useStyles from './styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';

const defaultGetLayout = (page) => {
	const { paddedContainer } = useStyles();
	return (
		<>
			<Header />
			<Grid container justify="center">
				<Grid
					item
					xs={9}
					sm={6}
					container
					direction="column"
					alignItems="center"
					className={paddedContainer}
				>
					{page}
				</Grid>
			</Grid>
		</>
	);
};

const TimePicker = ({ selectedDate, setSelectedDate, label }) => {
	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<MuiTimePicker
				inputVariant="outlined"
				variant="dialog"
				label={label}
				value={selectedDate}
				onChange={handleDateChange}
				onError={console.error}
				fullWidth
			/>
		</MuiPickersUtilsProvider>
	);
};

const DatePicker = ({ selectedDate, setSelectedDate, minDate, label }) => {
	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<MuiDatePicker
				inputVariant="outlined"
				variant="dialog"
				label={label}
				value={selectedDate}
				onChange={handleDateChange}
				onError={console.error}
				disablePast
				showTodayButton
				format="dd/MM/yyyy"
				minDate={minDate}
				fullWidth
			/>
		</MuiPickersUtilsProvider>
	);
};

const Notification = ({
	handleClose,
	title,
	message,
	type,
	isOpen,
	hideAfter = 6000,
	showDismiss = true,
	position = {
		vertical: 'top',
		horizontal: 'center',
	},
	slideDirection = 'down',
}) => {
	return (
		<Snackbar
			color="error"
			anchorOrigin={position}
			open={isOpen}
			autoHideDuration={hideAfter}
			onClose={handleClose}
			TransitionComponent={(props) => <Slide {...props} direction={slideDirection} />}
		>
			<Alert
				onClose={handleClose}
				severity={type}
				variant="filled"
				action={
					showDismiss && (
						<Button size="small" color="inherit" onClick={handleClose}>
							Dismiss
						</Button>
					)
				}
			>
				{title && <AlertTitle>{title}</AlertTitle>}
				{message}
			</Alert>
		</Snackbar>
	);
};

const request = axios.create({
	baseURL: process.env.API_URL,
	timeout: 1000,
});

export { defaultGetLayout, DatePicker, TimePicker, Notification, request };
