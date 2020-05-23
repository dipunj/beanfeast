module.exports =
	process.env.NODE_ENV === 'production'
		? (res, error) =>
				res.status(400).json({
					status: 400,
					message: error.message,
				})
		: (res, error) =>
				res.status(400).json({
					status: 400,
					message: error.stack.split('\n'),
				});
