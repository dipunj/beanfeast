import { useReducer, useState } from 'react';
import useStyles from './styles';
import { Grid, Button } from '@material-ui/core';
import { EditPopulation, ViewPopulation } from './Population';
import { EditTiming, ViewTiming } from './Timing';
import FeastDate from '../../Pool/new/FeastDate';
import mergeDateTime from '../../../utils/mergeDateTime';
import { request } from '../../util';

const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'date':
			return { ...state, date: action.date };
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
		poolData: {
			createdBy,
			fromTime: origFromTime,
			toTime: origToTime,
			maxPoolSize,
			currPoolSize,
			_id,
		},
		sessionData: { uniqueIdentifier },
	} = parentState;

	const [state, dispatch] = useReducer(reducer, {
		date: new Date(origFromTime),
		fromTime: new Date(origFromTime),
		toTime: new Date(origToTime),
		maxPoolSize,
	});

	const styles = useStyles();
	const [loading, setLoading] = useState(false);

	const handleModifyToggle = () => {
		setEdit(true);
	};

	const updatePool = async () => {
		const { date, fromTime: from, toTime: to, maxPoolSize } = state;
		const { fromTime, toTime } = mergeDateTime(date, from, to);
		const updateParams = {
			fromTime,
			toTime,
			maxPoolSize,
			uniqueIdentifier,
		};
		console.log(updateParams);
		const data = await request.post(`http://localhost:4000/pool/update/${_id}`, {
			...updateParams,
		});
		console.log(data);
		setEdit(false);
	};

	const handleUpdateCall = () => {
		setLoading(true);
		updatePool();
		setLoading(false);
	};

	if (edit) {
		return (
			<Grid container>
				<Grid item xs={12}>
					<EditPopulation {...{ state, dispatch }} />
				</Grid>
				<Grid item xs={12}>
					<EditTiming {...{ state, dispatch }} />
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
					<ViewTiming {...{ fromTime: origFromTime, toTime: origToTime }} />
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
