import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useSingleLayoutStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: '20px',
			marginTop: '30px',
		},
		header: {
			marginBottom: '20px',
		},
		divider: {
			height: 30,
			margin: '0px 20px',
		},
	})
);

export default useSingleLayoutStyles;
