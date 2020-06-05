import { Grid } from '@material-ui/core';
import { TimePicker, DatePicker, Notification, request } from '../../../util';

const Timing = ({ selectedDate, setSelectedDate, label }) => (
	<Grid item xs={12} sm={6}>
		<TimePicker
			{...{
				selectedDate,
				setSelectedDate,
				label,
			}}
		/>
	</Grid>
);

export default Timing;
