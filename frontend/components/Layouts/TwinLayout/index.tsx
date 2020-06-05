import { Grid, Paper, Typography, Divider, InputLabel, LinearProgress } from '@material-ui/core';
import useTwinLayoutStyles from './styles';

const TwinLayout = ({ header, left, divider, right }) => {
	const styles = useTwinLayoutStyles();

	const numberValues =
		typeof left.value == 'number' &&
		!isNaN(left.value) &&
		typeof right.value == 'number' &&
		!isNaN(right.value);

	const leftSection: JSX.Element = (
		<Grid item xs container {...left.gridProps}>
			{left.keyBefore && <InputLabel shrink>{left.key}</InputLabel>}
			<Typography variant={left.variant} align="center" color={left.color}>
				{left.value}
			</Typography>
			{!left.keyBefore && <InputLabel shrink>{left.key}</InputLabel>}
		</Grid>
	);

	const dividerSection: JSX.Element = divider ? (
		<Grid item>
			<Typography variant={divider.variant} align="center" color={divider.color}>
				{divider.value}
			</Typography>
		</Grid>
	) : (
		<Grid item>
			<Divider orientation="vertical" className={styles.divider} />
		</Grid>
	);

	const rightSection: JSX.Element = (
		<Grid item xs container {...right.gridProps}>
			{right.keyBefore && <InputLabel shrink>{right.key}</InputLabel>}
			<Typography variant={right.variant} align="center" color={right.color}>
				{right.value}
			</Typography>
			{!right.keyBefore && <InputLabel shrink>{right.key}</InputLabel>}
		</Grid>
	);
	return (
		<Paper>
			<Grid container direction="column" alignItems="stretch" className={styles.root}>
				<Grid item xs={12} className={styles.header}>
					<InputLabel>{header}</InputLabel>
				</Grid>
				<Grid
					item
					xs={12}
					container
					direction="row"
					alignItems="center"
					justify="space-between"
				>
					{leftSection}
					{dividerSection}
					{rightSection}
				</Grid>
			</Grid>
			{numberValues && (
				<Grid item xs={12}>
					<LinearProgress
						variant="determinate"
						value={(left.value * 100) / right.value}
					/>
				</Grid>
			)}
		</Paper>
	);
};

export default TwinLayout;
