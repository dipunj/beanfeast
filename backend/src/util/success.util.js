module.exports = (res, data, { mustShow = false, title = 'Success', message } = {}) => {
	if (mustShow && !message) {
		message = 'Request completed succesfully';
	}

	return res.status(400).json({
		meta: {
			success: false,
			response: {
				mustShow,
				title,
				message,
			},
		},
		data,
	});
};
