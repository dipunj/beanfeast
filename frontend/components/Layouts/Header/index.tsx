import { Grid } from '@material-ui/core';
import Branding from './Branding';
import useStyles from './styles';
import ToggleDarkMode from './ToggleDarkMode';

const Header = () => {
	const { container } = useStyles();
	return (
		<Grid container className={container} alignItems="center" justify="center">
			<Grid item>
				<Branding />
			</Grid>
			<Grid item>
				<ToggleDarkMode />
			</Grid>
		</Grid>
	);
};

export default Header;
