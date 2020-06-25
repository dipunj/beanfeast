import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => (
	<Backdrop open>
		<CircularProgress color="inherit" />
	</Backdrop>
);

export default Loader;
