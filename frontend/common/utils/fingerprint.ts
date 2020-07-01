import * as Fingerprint2 from 'fingerprintjs2';

const options = {
	excludes: {
		audio: true,
		enumerateDevices: true,
	},
};

const getBrowserFingerprint = async () => {
	const fingPrints = await Fingerprint2.getPromise(options);
	const values = fingPrints.map((fp) => fp.value);
	const uniqueGibberish = Fingerprint2.x64hash128(values.join(''), 31);
	return uniqueGibberish;
};

export default getBrowserFingerprint;
