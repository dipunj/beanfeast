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
			<Grid container className={paddedContainer}>
				{page}
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

const Notification = ({ handleClose, title, message, isOpen }) => {
	return (
		<Snackbar
			color="error"
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			open={isOpen}
			autoHideDuration={6000}
			onClose={handleClose}
			TransitionComponent={(props) => <Slide {...props} direction="down" />}
		>
			<Alert
				onClose={handleClose}
				severity="error"
				variant="filled"
				action={
					<Button size="small" color="inherit" onClick={handleClose}>
						Dismiss
					</Button>
				}
			>
				<AlertTitle>{title}</AlertTitle>
				{message}
			</Alert>
		</Snackbar>
	);
};
console.log(process.env.API_URL);
const request = axios.create({
	baseURL: process.env.API_URL,
	timeout: 1000,
});

export { defaultGetLayout, DatePicker, TimePicker, Notification, request };
