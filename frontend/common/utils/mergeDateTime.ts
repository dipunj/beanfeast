const mergeDateTime = (date, from, to) => {
	const d = date?.getDate();
	const m = date?.getMonth();
	const y = date?.getFullYear();
	const fromTime = new Date(y, m, d, from?.getHours(), from?.getMinutes());
	const toTime = new Date(y, m, d, to?.getHours(), to?.getMinutes());

	return { fromTime, toTime };
};

export default mergeDateTime;
