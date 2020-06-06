import { useReducer, useState } from 'react';
import useStyles from './styles';
import { Grid, Button, LinearProgress } from '@material-ui/core';
import { EditPopulation, ViewPopulation } from './Population';
import { EditTiming, ViewTiming } from './Timing';
import mergeDateTime from '../../../utils/mergeDateTime';
import { request } from '../../util';

const reducer = (dataState: any, action: any) => {
	switch (action.type) {
		case 'date':
			return { ...dataState, date: action.date };
		case 'fromTime':
			return { ...dataState, fromTime: action.fromTime };
		case 'toTime':
			return { ...dataState, toTime: action.toTime };
		case 'maxPoolSize':
			return { ...dataState, maxPoolSize: action.maxPoolSize };
		default:
			return dataState;
	}
};

const PoolStats = ({ parentState, isUpdating, setIsUpdating }) => {
	const {
		poolData: {
			createdBy,
			fromTime: origFromTime,
			toTime: origToTime,
			maxPoolSize: origMaxPoolSize,
			currPoolSize,
			_id,
		},
		sessionData: { uniqueIdentifier },
	} = parentState;

	const [editMode, setEditMode] = useState(false);
	const [dataState, dispatch] = useReducer(reducer, {
		date: new Date(origFromTime),
		fromTime: new Date(origFromTime),
		toTime: new Date(origToTime),
		maxPoolSize: origMaxPoolSize,
	});

	const styles = useStyles();

	const handleModifyToggle = () => setEditMode(true);
	const handleCancelUpdate = () => setEditMode(false);

	const handleUpdateCall = async () => {
		setIsUpdating(true);
		const { date, fromTime: from, toTime: to, maxPoolSize } = dataState;
		const { fromTime, toTime } = mergeDateTime(date, from, to);
		const updateParams = {
			fromTime,
			toTime,
			maxPoolSize,
			uniqueIdentifier,
		};
		const data = await request.post(`http://localhost:4000/pool/update/${_id}`, {
			...updateParams,
		});
		// }
		// TODO: Ensure that call was succesful
		// else show a toast/snackbar showing the error
		setIsUpdating(false);
		setEditMode(false);
	};

	if (editMode) {
		return (
			<Grid container>
				<Grid item xs={12}>
					<EditPopulation {...{ state: dataState, dispatch }} />
				</Grid>
				<Grid item xs={12}>
					<EditTiming {...{ state: dataState, dispatch }} />
				</Grid>
				{createdBy === uniqueIdentifier && (
					<Grid
						item
						xs={12}
						direction="row"
						container
						justify="space-evenly"
						alignItems="center"
						style={{ padding: '30px 10px' }}
					>
						<Grid item xs={12} md={4} container justify="center">
							<Button
								size="large"
								variant="contained"
								className={styles.updateRoot}
								onClick={handleUpdateCall}
							>
								Update
							</Button>
							{isUpdating && (
								<LinearProgress color="secondary" style={{ width: '100%' }} />
							)}
						</Grid>
						<Grid item xs={12} md={4} container justify="center">
							<Button
								size="large"
								variant="contained"
								className={styles.cancelRoot}
								onClick={handleCancelUpdate}
							>
								Cancel
							</Button>
						</Grid>
					</Grid>
				)}
			</Grid>
		);
	} else {
		return (
			<Grid container>
				<Grid item xs={12}>
					<ViewPopulation {...{ currPoolSize, maxPoolSize: origMaxPoolSize }} />
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
