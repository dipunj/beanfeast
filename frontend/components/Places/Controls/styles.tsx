import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		buttonProgress: {
			color: green[500],
			position: 'absolute',
			left: '50%',
			marginLeft: -12,
		},
		textFieldContainer: {
			padding: '10px 1px',
		},
		toolbar: {
			height: '100%',
		},
	})
);

export { useStyles };
