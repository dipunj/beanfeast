import { useReducer } from 'react';
import useStyles from './styles';
import { Grid, Button, LinearProgress, useMediaQuery } from '@material-ui/core';
import { EditPopulation, ViewPopulation } from './Population';
import { EditTiming, ViewTiming } from './Timing';
import mergeDateTime from '../../../../common/utils/mergeDateTime';
import { Request, Toast } from '../../../util';

const reducer = (dataState: any, action: any) => {
	switch (action.type) {
		case 'date':
			return { ...dataState, date: action.date };
		case 'fromTime':
			return { ...dataState, fromTime: action.fromTime };
		case 'toTime':
			return { ...dataState, toTime: action.toTime };
		case 'maxPoolSize':
			return {
				...dataState,
				maxPoolSize: Math.min(
					action.maxPoolSize,
					parseInt(process.env.MAX_POOL_SIZE) || 10
				),
			};
		default:
			return dataState;
	}
};

const PoolStats = ({ parentState, isUpdating, setIsUpdating, editMode, setEditMode }) => {
	const isMobile = useMediaQuery('(max-width:600px)');
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
		try {
			const {
				status,
				data: { meta, data },
			} = await Request.post(`/pool/update/${_id}`, {
				...updateParams,
			});
		} catch (error) {
			Toast({ error });
		}
		// else show a toast/snackbar showing the error
		setIsUpdating(false);
		setEditMode(false);
	};

	if (editMode) {
		return (
			<>
				<Grid container direction="column" justify="space-between" alignItems="stretch">
					<Grid item>
						<EditPopulation {...{ state: dataState, dispatch }} />
					</Grid>
					<Grid item>
						<EditTiming {...{ state: dataState, dispatch }} />
					</Grid>
					{createdBy === uniqueIdentifier && (
						<Grid
							item
							direction="row"
							container
							justify="space-evenly"
							alignItems="center"
							style={{ padding: '30px 10px' }}
						>
							<Grid item xs={12} sm={6} md={4} container justify="center">
								<Button
									disableRipple
									disableTouchRipple
									size="large"
									variant="contained"
									color="primary"
									className={
										isMobile ? styles.updateRootMobile : styles.updateRoot
									}
									onClick={handleUpdateCall}
								>
									Update
								</Button>
								{isUpdating && (
									<LinearProgress color="secondary" style={{ width: '100%' }} />
								)}
							</Grid>
							<Grid item xs={12} sm={6} md={4} container justify="center">
								<Button
									disableRipple
									disableTouchRipple
									size="large"
									variant="contained"
									className={
										isMobile ? styles.cancelRootMobile : styles.cancelRoot
									}
									onClick={handleCancelUpdate}
								>
									Cancel
								</Button>
							</Grid>
						</Grid>
					)}
				</Grid>
			</>
		);
	} else {
		return (
			<>
				<Grid container direction="column" justify="space-between" alignItems="stretch">
					<Grid item>
						<ViewPopulation {...{ currPoolSize, maxPoolSize: origMaxPoolSize }} />
					</Grid>
					<Grid item>
						<ViewTiming {...{ fromTime: origFromTime, toTime: origToTime }} />
					</Grid>
					{createdBy === uniqueIdentifier && (
						// <Grid item container justify="center">
						<Grid
							item
							direction="row"
							container
							justify="space-evenly"
							alignItems="center"
							style={{ padding: '30px 10px' }}
						>
							<Grid item xs={12} md={4} container justify="center">
								<Button
									{...{
										size: 'large',
										color: 'primary',
										variant: 'contained',
										className: styles.modifyRoot,
										onClick: handleModifyToggle,
										fullWidth: true,
									}}
								>
									Modify
								</Button>
							</Grid>
						</Grid>
					)}
				</Grid>
			</>
		);
	}
};

export default PoolStats;
