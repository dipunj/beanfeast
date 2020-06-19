const sortHullOrder = (points, algo = 'graham') => {
	// find the left most point
	// then sort according to polar angle (1st and 4th quadrant tan values)
	let origin = [...points[0]];

	for (let pt of points) {
		const [lat, lon] = pt;
		if (lon < origin[1] || (lon == origin[1] && lat < origin[0])) {
			origin = pt;
		}
	}

	points = points.filter((pt) => pt[0] != origin[0] && pt[1] != origin[1]);

	const [y, x] = origin;
	const sortedPoints = [
		origin,
		...points.sort((a, b) => {
			// since latitude measures the y axis on map
			// and longitude measures the x axis on map
			// assuming the points are in the format : [lat, lon]

			const [ya, xa] = a;
			const [yb, xb] = b;
			const tana = (ya - y) / (xa - x);
			const tanb = (yb - y) / (xb - x);
			return tana - tanb;
		}),
	];

	// switch (algo) {
	// 	case 'graham':
	// 	// return grahamHull(points);
	// 	case 'jarvis':
	// 	// return jarvisHull(points);
	// 	default:
	// 		return sortedPoints;
	// }
	return sortedPoints;
};

// const points = [
// 	[12.954857, 77.658193],
// 	[12.974059, 77.64981],
// 	[12.954159, 77.691163],
// 	[12.961121, 77.635947],
// ];
// console.log(sortHullOrder(points));

export default sortHullOrder;
