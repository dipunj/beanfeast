import { createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

const BeanfeastTheme = createMuiTheme({
	palette: createPalette({
		primary: {
			main: '#1B98E0',
		},
		secondary: {
			main: '#575860',
		},
		warning: {
			main: '#D72638',
		},
		// light: '#000000',
	}),
});

export default BeanfeastTheme;
