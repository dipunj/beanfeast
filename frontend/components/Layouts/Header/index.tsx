import { Grid } from '@material-ui/core';
import Branding from './Branding';
import useStyles from './styles';
import ToggleDarkMode from './ToggleDarkMode';

const Header = (styleProps) => {
	const { container } = useStyles({ ...styleProps });
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
