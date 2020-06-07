import { Snackbar, Slide, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

const Notification = ({
	handleClose,
	title,
	message,
	type,
	isOpen,
	hideAfter = 6000,
	showDismiss = true,
	position = {
		vertical: 'top',
		horizontal: 'center',
	},
	slideDirection = 'down',
}) => {
	return (
		<Snackbar
			color="error"
			anchorOrigin={position}
			open={isOpen}
			autoHideDuration={hideAfter}
			onClose={handleClose}
			TransitionComponent={(props) => <Slide {...props} direction={slideDirection} />}
		>
			<Alert
				onClose={handleClose}
				severity={type}
				variant="filled"
				action={
					showDismiss && (
						<Button size="small" color="inherit" onClick={handleClose}>
							Dismiss
						</Button>
					)
				}
			>
				{title && <AlertTitle>{title}</AlertTitle>}
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Notification;
