import mongoose, { connect } from 'mongoose';

const dbPath = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.ENV.DB_ADDR}:${process.env.DB_PORT}`;

connect(dbPath, {
	useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', () => {
	console.log('> error occurred from the database');
});
db.once('open', () => {
	console.log('> successfully opened the database');
});
export default mongoose;
