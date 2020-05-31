import { useState } from 'react';
import useStyles from './styles';
import fp from 'fingerprintjs2';
import { Grid } from '@material-ui/core';
import { TimePicker, DatePicker } from '../../util';

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
	const [fromDate, setFromDate] = useState<Date | null>(new Date());
	const [toDate, setToDate] = useState<Date | null>(new Date());

	return (
		<Grid container className={container} spacing={4}>
			<Grid item xs={12}>
				<DatePicker
					{...{
						selectedDate: fromDate,
						setSelectedDate: setFromDate,
						label: 'Date',
						minDate: new Date(),
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TimePicker
					{...{
						selectedDate: toDate,
						setSelectedDate: setToDate,
						label: 'From Time',
					}}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TimePicker
					{...{
						selectedDate: fromDate,
						setSelectedDate: setFromDate,
						label: 'To Time',
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default createNewPool;
