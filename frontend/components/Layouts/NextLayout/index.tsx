import Header from '../Header';
import { Grid } from '@material-ui/core';
import useStyles from './styles';

// used by _app.tsx
const defaultGetLayout = (page, styleProps) => {
	const { paddedContainer } = useStyles();
	return (
		<>
			<Header {...styleProps} />
			<Grid container justify="center">
				<Grid
					item
					xs={9}
					sm={6}
					container
					direction="column"
					alignItems="center"
					className={paddedContainer}
				>
					{page}
				</Grid>
			</Grid>
		</>
	);
};

export default defaultGetLayout;
