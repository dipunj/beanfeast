import { Typography, Paper, Divider, Grid } from '@material-ui/core';
import useStyles from './styles';

const Information = () => {
	const styles = useStyles();
	return (
		<Paper className={styles.paperRoot}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h6" color="secondary">
						Before you proceed
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography color="textSecondary" variant="body2">
						When you click JOIN POOL,{' '}
						{process.env.NEXT_PUBLIC_PROJECT_TITLE || 'Beanfeast'} would ask for
						location access. Your location is stored on our servers, but without your
						identity attached to it. This is why there is no login/signup system.
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography color="textSecondary" variant="body2">
						We instead rely on your browser details like version, screen resolution,
						user-agent and other configuration to generate a unique hash, which helps us
						map back to you.
					</Typography>
				</Grid>
				<Typography variant="caption" color="primary">
					**Please ensure that you use the same browser to access beanfeast for a
					particular pool
				</Typography>
			</Grid>
		</Paper>
	);
};

export default Information;
