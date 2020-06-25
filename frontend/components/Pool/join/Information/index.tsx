import { Typography, Paper, Divider, Grid } from '@material-ui/core';
import useStyles from './styles';

const Information = () => {
	const styles = useStyles();
	return (
		<Paper className={styles.paperRoot}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h6" color="textSecondary">
						Before you proceed
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography color="textSecondary" variant="body2">
						When you click JOIN POOL,{' '}
						{process.env.NEXT_PUBLIC_PROJECT_TITLE || 'Beanfeast'} your location would
						be sent to our servers, anonymously. This is why there is no login/signup
						system.
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography color="textSecondary" variant="body2">
						We instead rely on your browser details like browser version, screen
						resolution, user-agent and other configuration to generate a unique
						hash(browser fingerprint), which helps identify you for this short online
						get together.
					</Typography>
				</Grid>
				<Typography variant="caption" color="textPrimary">
					**Please ensure that you use the same browser to access beanfeast for a
					particular pool
				</Typography>
			</Grid>
		</Paper>
	);
};

export default Information;
