import { Typography } from '@material-ui/core';

const ToolTip = ({ title, details }) => (
	<>
		<Typography variant="subtitle1">{title}</Typography>
		<Typography variant="caption">{details}</Typography>
	</>
);

export default ToolTip;
