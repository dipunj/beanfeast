import { DatePicker as MuiDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

export default DatePicker;
