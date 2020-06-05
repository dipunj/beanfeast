import TwinLayout from '../../../Layouts/TwinLayout';
import { TimePicker } from '../../../util';
import SingleLayout from '../../../Layouts/SingleLayout';
import FeastDate from '../../../Pool/new/FeastDate';

const ViewTiming = ({ fromTime, toTime }) => {
	const options = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};
	const from = new Intl.DateTimeFormat('en-US', options).format(new Date(fromTime));
	const to = new Intl.DateTimeFormat('en-US', options).format(new Date(toTime));

	const props = {
		header: 'Timing',
		left: {
			key: 'From',
			value: from,
			variant: 'button',
			gridProps: { justify: 'flex-start', direction: 'column', alignItems: 'flex-start' },
			keyBefore: true,
		},
		right: {
			key: 'To',
			value: to,
			variant: 'button',
			gridProps: { justify: 'flex-start', direction: 'column', alignItems: 'flex-start' },
			keyBefore: true,
		},
	};
	return <TwinLayout {...props} />;
};

const EditTiming = ({ state, dispatch }) => {
	const { fromTime, toTime } = state;

	const from = (
		<TimePicker
			{...{
				label: 'From',
				selectedDate: fromTime,
				setSelectedDate: (fromTime: Date) => dispatch({ type: 'fromTime', fromTime }),
			}}
		/>
	);

	const to = (
		<TimePicker
			{...{
				label: 'To',
				selectedDate: toTime,
				setSelectedDate: (toTime: Date) => dispatch({ type: 'toTime', toTime }),
			}}
		/>
	);

	const props = {
		header: 'Timing',
		left: {
			key: null,
			value: from,
			variant: 'button',
			gridProps: { justify: 'flex-start', direction: 'column', alignItems: 'stretch' },
		},
		right: {
			key: null,
			value: to,
			variant: 'button',
			gridProps: { justify: 'flex-start', direction: 'column', alignItems: 'stretch' },
		},
	};
	return (
		<>
			<SingleLayout header="Date">
				<FeastDate
					{...{
						selectedDate: state.date,
						setSelectedDate: (date: Date) => dispatch({ type: 'date', date }),
					}}
				/>
			</SingleLayout>
			<TwinLayout {...props} />
		</>
	);
};

export { ViewTiming, EditTiming };
