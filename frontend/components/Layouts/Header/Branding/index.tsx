import { Grid, Typography } from '@material-ui/core';
import useStyles from './styles';

const Branding = ({ name = process.env.PROJECT_TITLE || 'Beanfeast' }) => {
	const { container, branding } = useStyles();
	return (
		<>
			<Typography color="primary" className={branding}>
				{name}
			</Typography>
		</>
	);
};

export default Branding;
