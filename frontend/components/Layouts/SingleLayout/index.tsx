import useSingleLayoutStyles from './styles';
import { Paper, Grid, InputLabel } from '@material-ui/core';

const SingleLayout = ({ header, children }) => {
	const styles = useSingleLayoutStyles();
	return (
		<Paper>
			<Grid container direction="column" alignItems="stretch" className={styles.root}>
				<Grid item xs={12} className={styles.header}>
					<InputLabel>{header}</InputLabel>
				</Grid>
				{children}
			</Grid>
		</Paper>
	);
};

export default SingleLayout;
