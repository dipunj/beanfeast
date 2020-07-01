import { Typography, IconButton, Paper } from '@material-ui/core';
import DirectionsIcon from '@material-ui/icons/Directions';
import { MouseEventHandler } from 'react';
// import useStyles from './styles';

const ToolTip = ({
	title,
	details,
	showIcon,
	handleOpen,
}: {
	title: string;
	details: any;
	showIcon?: boolean;
	handleOpen?: MouseEventHandler;
}) => (
	<div>
		<Typography variant="subtitle1">{title}</Typography>
		<Typography variant="caption">{details}</Typography>
		{showIcon && (
			<IconButton aria-label="directions" color="primary" onClick={handleOpen}>
				<DirectionsIcon />
			</IconButton>
		)}
	</div>
);

export default ToolTip;
