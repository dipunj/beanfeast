import TwinLayout from '../../../Layouts/TwinLayout';

const ViewPopulation = ({ currPoolSize, maxPoolSize }) => {
	const props = {
		header: 'Pool Population',
		left: {
			key: '(Joined)',
			value: currPoolSize,
			variant: 'h4',
			color: 'secondary',
			gridProps: { justify: 'center' },
			keyBefore: false,
		},
		divider: {
			value: '/',
			variant: 'h4',
			color: 'secondary',
			keyBefore: false,
		},
		right: {
			key: '(Capacity)',
			value: maxPoolSize,
			variant: 'h4',
			color: 'primary',
			gridProps: { justify: 'center' },
			keyBefore: false,
		},
	};

	return <TwinLayout {...props} />;
};

const EditPopulation = ({ currPoolSize, state, dispatch, edit, setEdit }) => {
	const props = {
		header: 'Pool Population',
		left: {
			key: '(Joined)',
			value: currPoolSize,
			variant: 'h4',
			color: 'secondary',
			gridProps: { justify: 'center' },
			keyBefore: false,
		},
		divider: {
			value: '/',
			variant: 'h4',
			color: 'secondary',
			keyBefore: false,
		},
		right: {
			key: '(Capacity)',
			value: maxPoolSize,
			variant: 'h4',
			color: 'primary',
			gridProps: { justify: 'center' },
			keyBefore: false,
		},
	};

	return <TwinLayout {...props} />;
};

export { ViewPopulation, EditPopulation };
