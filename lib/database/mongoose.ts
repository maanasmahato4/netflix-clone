import mongoose from 'mongoose';
declare global {
	var mongoose: {
		conn: any;
		promise: any;
	};
}

global.mongoose = {
	conn: null,
	promise: null,
};

export default async function dbConnect() {
	if (global.mongoose.conn && global.mongoose.promise) {
		console.log('database connection already established');
		return global.mongoose.conn;
	} else {
		const mongodbUrl = process.env.MONGO_URL as string;
		const connection = await mongoose.connect(mongodbUrl, { autoIndex: true });
		global.mongoose = {
			conn: connection,
			promise: connection,
		};
		console.log('database connection established');
		return connection;
	}
}
