import { useMemo } from 'react';
import getTheme from './styles';

const useTheme = ({ darkMode }) => {
	const theme = useMemo(() => getTheme(darkMode), [darkMode]);
	return theme;
};
export default useTheme;
