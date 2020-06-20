import { useState } from 'react';
import { AppBar, Toolbar, TextField, Button, Grid, CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';

// REACT LESSON: try putting the following component directly into the CardsAndMaps component
// so query, radius would become states of CardsAndMaps
// when user changes radius the corresponding onChange would alter the state radius
// causing rerender of CardsAndMaps
// which has other render expensive component like Map
// causing the browser to show a visible change
// if the controls are seperated like following, the react diffing algorithm would only find
// that the node Controls in Virtual DOM has changed and would only rerender the following component
// This helped: https://stackoverflow.com/a/50820219/6922149
const Controls = ({ data, reRequest }) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState(data.api.query);
	const [radius, setRadius] = useState(data.api.radius);

	const handleQueryChange = ({ target: { value } }) => setQuery(value);
	const handleRadiusChange = ({ target: { value } }) => setRadius(parseInt(value) || 0);

	const handleSubmit = async () => {
		setLoading(true);
		await reRequest(query, radius);
		setLoading(false);
	};

	return (
		<AppBar position="static" color="default">
			<Toolbar>
				<Grid container justify="center" spacing={5} alignItems="center">
					<Grid item>
						<TextField
							id="searchRadius"
							label="Search Radius"
							variant="standard"
							value={radius}
							onChange={handleRadiusChange}
						/>
					</Grid>
					<Grid item>
						<TextField
							id="queryString"
							label="Search For"
							variant="standard"
							value={query}
							onChange={handleQueryChange}
						/>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							disabled={loading}
							onClick={handleSubmit}
						>
							Submit
							{loading && (
								<CircularProgress size={24} className={classes.buttonProgress} />
							)}
						</Button>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Controls;
