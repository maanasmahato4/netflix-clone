import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId(),
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: '',
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		emailVerified: {
			type: Date,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		sessions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Session',
			},
		],
		accounts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Account',
			},
		],
		favoriteIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
			},
		],
	},
	{ timestamps: true },
);

const movieSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId(),
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		videoUrl: {
			type: String,
			required: true,
		},
		thumbnailUrl: {
			type: String,
			required: true,
		},
		genre: {
			type: String,
			required: true,
		},
		duration: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export const UserModel =
	mongoose.models.User || mongoose.model('User', UserSchema);
export const MovieModel =
	mongoose.models.Movie || mongoose.model('Movie', movieSchema);
