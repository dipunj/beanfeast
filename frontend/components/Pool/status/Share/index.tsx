import React, { useRef, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import ShareIcon from '@material-ui/icons/Share';
import { NotificationToast } from '../../../util';
import useStyles from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from '@material-ui/core';

const sharePoolDetails = ({ poolId }) => {
	const isMobile = useMediaQuery('(max-width:500px)');
	const [notif, setNotif] = useState({ show: false, message: '', type: '' });
	const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pool/join/${poolId}`;
	const urlRef = useRef(null);
	const classes = useStyles();

	const handleClose = (e, reason?) => {
		if (reason === 'clickaway') {
			return;
		}
		setNotif({
			show: false,
			message: '',
			type: '',
		});
	};

	const copyToClipboard = () => {
		urlRef.current.select();
		document.execCommand('copy');

		setNotif({
			show: true,
			message: 'copied',
			type: 'success',
		});
	};

	const share = async () => {
		// await navigator.share({
		// 	url: shareUrl,
		// 	text: '',
		// 	title: '',
		// });
		// requires HTTPS
	};
	if (isMobile) {
		return (
			<Grid container className={classes.mobileContainerRoot}>
				<Grid item xs={12}>
					<Paper variant="outlined" className={classes.mobileRoot}>
						<InputBase
							disabled
							className={classes.input}
							value={shareUrl}
							inputProps={{ style: { textAlign: 'center' } }}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper variant="outlined" className={classes.mobileExtra}>
						<Grid container justify="space-between">
							<Grid container xs={5} justify="center">
								<IconButton
									onClick={copyToClipboard}
									color="default"
									className={classes.iconButton}
									aria-label="directions"
								>
									<FileCopyOutlinedIcon />
								</IconButton>
							</Grid>
							<Grid container xs={2} justify="center" alignItems="center">
								<Divider className={classes.divider} orientation="vertical" />
							</Grid>
							<Grid container xs={5} justify="center">
								<IconButton
									onClick={share}
									color="primary"
									className={classes.iconButton}
									aria-label="share"
								>
									<ShareIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Paper>
					<NotificationToast
						{...{
							isOpen: notif.show,
							handleClose,
							message: notif.message,
							type: notif.type,
							hideAfter: 3000,
							showDismiss: false,
							position: { vertical: 'bottom', horizontal: 'center' },
							slideDirection: 'up',
						}}
					/>
					<input
						style={{
							opacity: 0,
							pointerEvents: 'none',
							position: 'absolute',
							left: '-1000px',
							top: '-1000px',
						}}
						ref={urlRef}
						value={shareUrl}
					/>
				</Grid>
			</Grid>
		);
	}
	return (
		<Paper variant="outlined" className={classes.root}>
			<IconButton
				onClick={copyToClipboard}
				color="default"
				className={classes.iconButton}
				aria-label="directions"
			>
				<FileCopyOutlinedIcon />
			</IconButton>
			<Divider className={classes.divider} orientation="vertical" />
			<InputBase
				disabled
				className={classes.input}
				value={shareUrl}
				inputProps={{ style: { textAlign: 'center' } }}
			/>
			<Divider className={classes.divider} orientation="vertical" />
			<IconButton
				onClick={share}
				color="primary"
				className={classes.iconButton}
				aria-label="share"
			>
				<ShareIcon />
			</IconButton>
			<NotificationToast
				{...{
					isOpen: notif.show,
					handleClose,
					message: notif.message,
					type: notif.type,
					hideAfter: 3000,
					showDismiss: false,
					position: { vertical: 'bottom', horizontal: 'center' },
					slideDirection: 'up',
				}}
			/>
			<input
				style={{
					opacity: 0,
					pointerEvents: 'none',
					position: 'absolute',
					left: '-1000px',
					top: '-1000px',
				}}
				ref={urlRef}
				value={shareUrl}
			/>
		</Paper>
	);
};

export default sharePoolDetails;
