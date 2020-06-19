import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 345,
			margin: 8,
		},
		focusedRoot: {
			maxWidth: 345,
			margin: 8,
			border: '1px solid black',
		},
		focusedDarkRoot: {
			maxWidth: 345,
			margin: 8,
			border: '1px solid white',
		},
		rating: {
			marginLeft: 'auto',
		},
		ratingPaper: {
			display: 'flex',
			justifyContent: 'flex-end',
			flexWrap: 'wrap',
			'& > *': {
				margin: theme.spacing(0.5),
			},
		},
	})
);

export default useStyles;
