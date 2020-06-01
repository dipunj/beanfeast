import Header from '../Layouts/Header';
import {
	MuiPickersUtilsProvider,
	TimePicker as MuiTimePicker,
	DatePicker as MuiDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import useStyles from './styles';

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

export { defaultGetLayout, DatePicker, TimePicker };
