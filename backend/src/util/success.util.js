module.exports = (res, data, { mustShow = false, title = 'Success', message } = {}) => {
	if (mustShow && !message) {
		message = 'Request completed succesfully';
	}

	return res.status(200).json({
		meta: {
			success: true,
			response: {
				type: 'success',
				mustShow,
				title,
				message,
			},
		},
		data,
	});
};
