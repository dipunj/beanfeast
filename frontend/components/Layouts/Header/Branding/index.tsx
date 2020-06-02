import { Typography } from '@material-ui/core';
import useStyles from './styles';

const Branding = ({ name = process.env.PROJECT_TITLE || 'Beanfeast' }) => {
	const { branding } = useStyles();
	return (
		<>
			<Typography color="primary" className={branding}>
				{name}
			</Typography>
			{/* to test whether this component is re-rendered, simply enter some text in the text field in the browser, if the text clears, it means this component re-rendered */}
			{/* <input type="text"></input> */}
		</>
	);
};

export default Branding;
