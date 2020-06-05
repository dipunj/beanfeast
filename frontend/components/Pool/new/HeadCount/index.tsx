import { OutlinedInput, Slider, Grid, Typography } from '@material-ui/core';

const HeadCountNumber = ({ value, onChange }) => {
	return (
		<Grid item xs={12} sm={4} lg={2}>
			<OutlinedInput
				fullWidth
				value={value}
				margin="none"
				onChange={onChange}
				// onBlur={handleBlur}
				inputProps={{
					step: 1,
					min: 1,
					max: process.env.MAX_POOL_SIZE || 10,
					type: 'number',
					'aria-labelledby': 'headCount-slider',
					style: { textAlign: 'center' },
				}}
			/>
		</Grid>
	);
};

const HeadCountSlider = ({ value, onChange }) => {
	return (
		<Grid item xs={12} sm={8} lg={10}>
			<Slider
				value={value}
				onChange={onChange}
				aria-labelledby="headCount-slider"
				valueLabelDisplay="auto"
				step={1}
				min={1}
				max={process.env.MAX_POOL_SIZE || 10}
				valueLabelDisplay="on"
			/>
		</Grid>
	);
};

const HeadCountLabel = () => (
	<Grid item xs={12}>
		<Typography id="headCount-slider" color="secondary">
			Head Count? (including you)
		</Typography>
	</Grid>
);
const HeadCount = ({ value, numberOnChange, sliderOnChange }) => (
	<>
		<HeadCountSlider {...{ value, onChange: sliderOnChange }} />
		<HeadCountNumber {...{ value, onChange: numberOnChange }} />
	</>
);

export default HeadCount;
export { HeadCountSlider, HeadCountNumber, HeadCountLabel };
