import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

const darkTheme: ThemeOptions = {
	palette: {
		primary: {
			// light: '#1B98E0',
			main: '#1B98E0',
			// dark: '#DDDDDD',
		},
		text: {
			// primary: '#1B98E0',
			// secondary: '#575860',
		},
		secondary: {
			main: '#575860',
			dark: '#00cc00',
		},
		type: 'dark',
	},
};

const lightTheme: ThemeOptions = {
	palette: {
		primary: {
			// light: '#1B98E0',
			main: '#1B98E0',
			// dark: '#DDDDDD',
		},
		text: {
			// primary: '#1B98E0',
			// secondary: '#575860',
		},
		secondary: {
			light: '#ff0000',
			main: '#575860',
			// contrastText: '#ffcc00',
			// dark: '#ffcc00',
		},
		type: 'light',
		// warning: {
		// 	main: '#D72638',
		// },
		// light: '#000000',
	},
};

const getTheme = (darkMode) => createMuiTheme(darkMode ? darkTheme : lightTheme);
export default getTheme;
