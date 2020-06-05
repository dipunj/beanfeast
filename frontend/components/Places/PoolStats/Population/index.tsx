import TwinLayout from '../../../Layouts/TwinLayout';
import HeadCount from '../../../Pool/new/HeadCount';
import SingleLayout from '../../../Layouts/SingleLayout';
import { Grid } from '@material-ui/core';

const ViewPopulation = ({ currPoolSize, maxPoolSize }) => {
	const props = {
		header: 'Pool Population',
		left: {
			key: currPoolSize === 1 ? '(Joined - Only You)' : '(Joined)',
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

const EditPopulation = ({ state, dispatch }) => {
	return (
		<SingleLayout header="Max Pool Size">
			<Grid
				container
				{...{
					direction: 'row',
					justify: 'center',
					alignItems: 'center',
					spacing: 4,
				}}
			>
				<HeadCount
					{...{
						value: state.maxPoolSize,
						sliderOnChange: (_, maxPoolSize) =>
							dispatch({ type: 'maxPoolSize', maxPoolSize }),
						numberOnChange: ({ target: { value: maxPoolSize } }) =>
							dispatch({ type: 'maxPoolSize', maxPoolSize }),
					}}
				/>
			</Grid>
		</SingleLayout>
	);
};

export { ViewPopulation, EditPopulation };
