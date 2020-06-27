import { Paper, Button, StylesProvider, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import useStyles from './styles';

const RedirectButtons = ({ showAbout = true }) => {
	const router = useRouter();
	const styles = useStyles();

	const redirectToNewPool = () => {
		router.push(`/pool/new`);
	};

	const redirectToAboutPage = () => {
		router.push('/');
	};
	return (
		<Paper variant="outlined" className={styles.root}>
			<Grid container spacing={9} alignItems="center" justify="center">
				{showAbout && (
					<Grid item>
						<Button
							size="medium"
							variant="outlined"
							// color="secondary"
							onClick={redirectToAboutPage}
						>
							About
						</Button>
					</Grid>
				)}
				<Grid item>
					<Button
						size="large"
						variant="contained"
						color="primary"
						onClick={redirectToNewPool}
					>
						Create New Pool
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default RedirectButtons;
