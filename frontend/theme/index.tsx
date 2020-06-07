import { createMuiTheme } from '@material-ui/core/styles';
import { useMemo } from 'react';

const useTheme = ({ darkMode }) => {
	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					primary: {
						light: '#1B98E0',
						main: '#1B98E0',
						dark: '#DDDDDD',
					},
					secondary: {
						light: '#1B98E0',
						main: '#575860',
						dark: '#DDDDDD',
					},
					type: darkMode ? 'dark' : 'light',
					// warning: {
					// 	main: '#D72638',
					// },
					// light: '#000000',
				},
			}),
		[darkMode]
	);
	return theme;
};
export default useTheme;
