const handleOnSave = (err, doc) => {
	if (err) console.error(err);
	else {
		console.log('doc saved succesfully', doc);
	}
};

module.exports = handleOnSave;
