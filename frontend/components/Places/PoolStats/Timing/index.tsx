import TwinLayout from '../../../Layouts/TwinLayout';

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

const EditTiming = ({ state, dispatch, edit, setEdit }) => {
	const { fromTime, toTime } = state;

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
};

export { ViewTiming, EditTiming };
