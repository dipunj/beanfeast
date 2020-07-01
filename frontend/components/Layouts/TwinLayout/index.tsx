import {
	Grid,
	Paper,
	Typography,
	Divider,
	InputLabel,
	LinearProgress,
	useMediaQuery,
} from '@material-ui/core';
import useTwinLayoutStyles from './styles';

interface propType {
	header: string;
	left: {
		key: string;
		value: any;
		variant:
			| 'button'
			| 'caption'
			| 'h1'
			| 'h2'
			| 'h3'
			| 'h4'
			| 'h5'
			| 'h6'
			| 'inherit'
			| 'overline'
			| 'subtitle1'
			| 'subtitle2'
			| 'body1'
			| 'body2'
			| 'srOnly';
		color?:
			| 'error'
			| 'primary'
			| 'secondary'
			| 'inherit'
			| 'initial'
			| 'textPrimary'
			| 'textSecondary';
		gridProps: any;
		keyBefore?: boolean;
	};
	divider?: {
		value: any;
		variant:
			| 'button'
			| 'caption'
			| 'h1'
			| 'h2'
			| 'h3'
			| 'h4'
			| 'h5'
			| 'h6'
			| 'inherit'
			| 'overline'
			| 'subtitle1'
			| 'subtitle2'
			| 'body1'
			| 'body2'
			| 'srOnly';
		color?:
			| 'error'
			| 'primary'
			| 'secondary'
			| 'inherit'
			| 'initial'
			| 'textPrimary'
			| 'textSecondary';
		keyBefore?: boolean;
	};
	right: {
		key: string;
		value: any;
		variant:
			| 'button'
			| 'caption'
			| 'h1'
			| 'h2'
			| 'h3'
			| 'h4'
			| 'h5'
			| 'h6'
			| 'inherit'
			| 'overline'
			| 'subtitle1'
			| 'subtitle2'
			| 'body1'
			| 'body2'
			| 'srOnly';
		color?:
			| 'error'
			| 'primary'
			| 'secondary'
			| 'inherit'
			| 'initial'
			| 'textPrimary'
			| 'textSecondary';
		gridProps: any;
		keyBefore?: boolean;
	};
	style?: any;
}

const TwinLayout = ({ header, left, divider, right, style }: propType) => {
	const isMobile = useMediaQuery('(max-width:500px)');
	const styles = useTwinLayoutStyles();

	const numberValues =
		typeof left.value == 'number' &&
		!isNaN(left.value) &&
		typeof right.value == 'number' &&
		!isNaN(right.value);

	const leftSection: JSX.Element = (
		<Grid item xs container {...left.gridProps}>
			{left.key && left.keyBefore && <InputLabel shrink>{left.key}</InputLabel>}
			<Typography variant={left.variant} align="center" color={left.color}>
				{left.value}
			</Typography>
			{left.key && !left.keyBefore && <InputLabel shrink>{left.key}</InputLabel>}
		</Grid>
	);

	const dividerSection: JSX.Element = isMobile ? (
		<Grid item xs container>
			<Divider
				orientation="horizontal"
				variant="fullWidth"
				className={styles.horizontalDivider}
			/>
		</Grid>
	) : divider ? (
		<Grid item>
			<Typography variant={divider.variant} align="center" color={divider.color}>
				{divider.value}
			</Typography>
		</Grid>
	) : (
		<Grid item>
			<Divider orientation="vertical" className={styles.verticalDivider} />
		</Grid>
	);

	const rightSection: JSX.Element = (
		<Grid item xs container {...right.gridProps}>
			{right.key && right.keyBefore && <InputLabel shrink>{right.key}</InputLabel>}
			<Typography variant={right.variant} align="center" color={right.color}>
				{right.value}
			</Typography>
			{right.key && !right.keyBefore && <InputLabel shrink>{right.key}</InputLabel>}
		</Grid>
	);

	return (
		<Paper className={styles.paperRoot} {...{ style }}>
			<Grid container direction="column" alignItems="stretch" className={styles.root}>
				{header && (
					<Grid item xs={12} className={styles.header}>
						<InputLabel>{header}</InputLabel>
					</Grid>
				)}
				<Grid
					item
					xs={12}
					container
					direction={isMobile ? 'column' : 'row'}
					alignItems={isMobile ? 'flex-start' : 'center'}
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
						className={styles.linearProgress}
						variant="determinate"
						value={(parseFloat(left.value) * 100) / parseFloat(right.value)}
					/>
				</Grid>
			)}
		</Paper>
	);
};

export default TwinLayout;
