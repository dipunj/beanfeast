import { ThemeProvider } from '@material-ui/core';
import { useContext } from 'react';
import { SessionCtx } from '../Context';
import useTheme from '../../theme';

const Providers = ({ children }) => {
	const {
		ctx: { darkMode },
	} = useContext(SessionCtx);

	const theme = useTheme({ darkMode });

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Providers;
