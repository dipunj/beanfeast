import { TimePicker as MuiTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

export default TimePicker;
