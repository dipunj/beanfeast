import { Grid } from '@material-ui/core';
import { DatePicker } from '../../../util';

const FeastDate = ({ selectedDate, setSelectedDate }) => (
	<Grid item xs={12}>
		<DatePicker
			{...{
				selectedDate,
				setSelectedDate,
				label: 'Date',
				minDate: new Date(),
			}}
		/>
	</Grid>
);

export default FeastDate;
