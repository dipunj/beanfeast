import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			width: '100%',
		},
		mobileRoot: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			borderRadius: '4px 4px 0px 0px',
		},
		mobileExtra: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			borderTop: 'none',
			borderRadius: '0px 0px 4px 4px',
		},
		input: {
			marginLeft: theme.spacing(1),
			flex: 1,
		},
		iconButton: {
			// padding: '10px 15px',
		},
		divider: {
			height: 28,
			margin: 4,
		},
	})
);

export default useStyles;
