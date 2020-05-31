import { Grid } from '@material-ui/core';
import Branding from './Branding';
import useStyles from './styles';

const Header = () => {
	const { container } = useStyles();
	return (
		<>
			<Grid container className={container}>
				<Branding />
			</Grid>
		</>
	);
};

export default Header;
