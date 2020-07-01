import { useContext, useEffect } from 'react';
import { SessionCtx } from '../../../Context';
import { IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { saveToLS } from '../../../../common/utils/localStorage';

const ToggleDarkMode = () => {
	const { ctx, setCtx } = useContext(SessionCtx);

	const toggle = () => {
		saveToLS('darkMode', !ctx.darkMode);
		setCtx((cx) => ({ ...cx, darkMode: !cx.darkMode }));
	};

	return (
		<IconButton onClick={toggle}>
			{ctx.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
		</IconButton>
	);
};

export default ToggleDarkMode;
