var mongoose = require('mongoose');

const dbPath = process.env.DB_URL;

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => {
	console.log('> error occurred from the database');
});
db.once('open', () => {
	console.log('> successfully opened the database');
});

module.exports = mongoose;
