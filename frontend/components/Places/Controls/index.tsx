import { useState } from 'react';
import { AppBar, Toolbar, TextField, Button, Grid, CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';
import { useRouter } from 'next/router';

// REACT LESSON: try putting the following component directly into the CardsAndMaps component
// so query, radius would become states of CardsAndMaps
// when user changes radius the corresponding onChange would alter the state radius
// causing rerender of CardsAndMaps
// which has other render expensive component like Map
// causing the browser to show a visible lag
// if the controls are seperated into a seperate component (Controls), the react diffing algorithm would only find
// that the node Controls in Virtual DOM has changed and would only rerender it and not its siblings like Map
// This helped: https://stackoverflow.com/a/50820219/6922149
const Controls = ({ isAdmin, data, reRequest }: { isAdmin: boolean; reRequest: Function }) => {
	const router = useRouter();
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState(data.api.query);
	const [radius, setRadius] = useState(data.api.radius);

	const handleQueryChange = ({ target: { value } }) => setQuery(value);
	const handleRadiusChange = ({ target: { value } }) => setRadius(Math.max(parseInt(value), 0));

	const redirect = () => {
		router.push(`/pool/status/[poolId]`, `/pool/status/${data.poolData._id}`);
	};

	const handleSubmit = async () => {
		setLoading(true);
		await reRequest(query, radius);
		setLoading(false);
	};

	return (
		<AppBar position="static" color="default">
			<Toolbar className={classes.toolbar}>
				<Grid container alignItems="center" direction="row">
					<Grid
						container
						justify="space-evenly"
						item
						xs={12}
						md
						className={classes.textFieldContainer}
					>
						<Grid item>
							<TextField
								id="searchRadius"
								label="Search Radius (m)"
								variant="standard"
								type="number"
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
					</Grid>
					<Grid
						container
						justify="center"
						alignItems="center"
						item
						xs={12}
						md={isAdmin ? 3 : 2}
						className={classes.textFieldContainer}
					>
						{isAdmin && (
							<Grid item xs>
								<Button variant="outlined" color="default" onClick={redirect}>
									Modify Pool
								</Button>
							</Grid>
						)}
						<Grid item xs>
							<Button
								variant="contained"
								color="primary"
								disabled={loading}
								size="large"
								onClick={handleSubmit}
								fullWidth
							>
								Submit
								{loading && (
									<CircularProgress
										size={24}
										className={classes.buttonProgress}
									/>
								)}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Controls;
