import React, { useRef, useContext } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DirectionsIcon from '@material-ui/icons/Directions';
import useStyles from './styles';
import { Rating } from '@material-ui/lab';
import { Chip, Paper, Container, emphasize } from '@material-ui/core';
import { SessionCtx } from '../../Context';

const chipColors = ['default', 'primary', 'secondary'] as const;

interface propsType {
	id: string;
	refptr: any;
	name: string;
	phone: string;
	isFocused: boolean;
	rating: number;
	fullAddress: string;
	shortAddress: string;
	api: {
		name: string;
	};
	position: {
		lat: number;
		lon: number;
	};
	tags: string[];
}

const PlacesCard = ({
	id,
	refptr,
	name,
	phone,
	tags,
	rating,
	fullAddress,
	api,
	position: { lat, lon },
	isFocused,
}: propsType) => {
	const {
		ctx: { darkMode },
	} = useContext(SessionCtx);
	const classes = useStyles();

	const handleOpen = () => {
		// window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`);
		window.open(
			`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving&layer=traffic`
		);
	};

	return (
		<div ref={refptr} key={id}>
			<Card
				className={
					isFocused
						? darkMode
							? classes.focusedDarkRoot
							: classes.focusedRoot
						: classes.root
				}
				elevation={isFocused ? 4 : 0}
				variant={isFocused ? 'elevation' : 'outlined'}
			>
				<CardHeader
					title={name}
					action={
						<CardActions disableSpacing>
							<IconButton aria-label="directions" onClick={handleOpen}>
								<DirectionsIcon />
							</IconButton>
						</CardActions>
					}
					// subheader={<Typography>{phone || <i>Phone not listed</i>}</Typography>}
				/>
				<CardContent>
					<Typography variant="caption" component="div">
						{api.name} Rating
					</Typography>
					<Typography variant="body2" color="textSecondary" className={classes.rating}>
						<Rating aria-label="rating" name="rating" value={rating} readOnly />
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{fullAddress}
					</Typography>
					<Paper className={classes.ratingPaper} elevation={0}>
						{tags?.map((tg, idx) => (
							<Chip key={idx} label={tg} color={chipColors[idx % 3]} />
						))}
					</Paper>
				</CardContent>
			</Card>
		</div>
	);
};

export default PlacesCard;
