import { useReducer, useState } from 'react';
import useStyles from './styles';
import { Grid, Button } from '@material-ui/core';
import { EditPopulation, ViewPopulation } from './Population';
import { EditTiming, ViewTiming } from './Timing';

const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'fromTime':
			return { ...state, fromTime: action.fromTime };
		case 'toTime':
			return { ...state, toTime: action.toTime };
		case 'maxPoolSize':
			return { ...state, maxPoolSize: action.maxPoolSize };
		default:
			return state;
	}
};

const PoolStats = ({ parentState, edit, setEdit }) => {
	const {
		poolData: { createdBy, fromTime, toTime, maxPoolSize, currPoolSize },
		sessionData: { uniqueIdentifier },
	} = parentState;

	const [state, dispatch] = useReducer(reducer, {
		fromTime: new Date(fromTime),
		toTime: new Date(toTime),
		maxPoolSize,
	});

	const styles = useStyles();
	const [loading, setLoading] = useState(false);

	const handleModifyToggle = () => {
		setEdit(true);
	};

	const updatePool = async () => {
		// make post call here
	};

	const handleUpdateCall = () => {
		setLoading(true);
		updatePool();
		setLoading(false);
		setEdit(false);
	};

	if (edit) {
		return (
			<Grid container>
				<Grid item xs={12}>
					<EditPopulation {...{ state, dispatch, edit, setEdit }} />
				</Grid>
				<Grid item xs={12}>
					<EditTiming {...{ state, dispatch, edit, setEdit }} />
				</Grid>
				{createdBy === uniqueIdentifier && (
					<Grid item xs={12} container justify="center" alignItems="center">
						<Button
							size="large"
							variant="contained"
							className={styles.updateRoot}
							onClick={handleUpdateCall}
						>
							Update
						</Button>
					</Grid>
				)}
			</Grid>
		);
	} else {
		return (
			<Grid container>
				<Grid item xs={12}>
					<ViewPopulation {...{ currPoolSize, maxPoolSize }} />
				</Grid>
				<Grid item xs={12}>
					<ViewTiming {...{ fromTime, toTime }} />
				</Grid>
				{createdBy === uniqueIdentifier && (
					<Grid item xs={12} container justify="center" alignItems="center">
						<Button
							size="large"
							color="primary"
							variant="contained"
							className={styles.modifyRoot}
							onClick={handleModifyToggle}
						>
							Modify
						</Button>
					</Grid>
				)}
			</Grid>
		);
	}
};

export default PoolStats;
