import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DirectionsIcon from '@material-ui/icons/Directions';
import useStyles from './styles';
import { Rating } from '@material-ui/lab';
import { Chip, Paper, Container, emphasize } from '@material-ui/core';

const chipColors = ['default', 'primary', 'secondary'];

const PlacesCard = ({ name, phone, tags, rating, address, position: { lat, lon } }) => {
	console.log(rating);
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleOpen = () => {
		// window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`);
		window.open(
			`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`
		);
	};

	return (
		<Card className={classes.root}>
			<CardHeader title={name} />
			<CardContent>
				<Typography variant="subtitle2">{phone || <i>Phone not listed</i>}</Typography>
				<Typography variant="caption" align="right" component="div">
					TomTom Rating
				</Typography>
				<Typography
					variant="body2"
					color="textSecondary"
					align="right"
					className={classes.rating}
				>
					<Rating aria-label="rating" name="rating" value={rating} readOnly />
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{address}
				</Typography>
				<Paper className={classes.ratingPaper} elevation={0}>
					{tags?.map((tg, idx) => (
						<Chip label={tg} color={chipColors[idx % 3]} />
					))}
				</Paper>
			</CardContent>

			<CardActions disableSpacing>
				<IconButton aria-label="share" onClick={handleOpen}>
					<DirectionsIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default PlacesCard;
