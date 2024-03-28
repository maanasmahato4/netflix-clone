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

const accountSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId(),
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		type: {
			type: String,
			required: true,
		},
		provider: {
			type: String,
			required: true,
		},
		providerAccountId: {
			type: String,
			required: true,
		},
		refresh_token: {
			type: String,
		},
		expires_at: {
			type: Number,
		},
		token_type: {
			type: String,
		},
		scope: {
			type: String,
		},
		id_token: {
			type: String,
		},
		session_state: {
			type: String,
		},
	},
	{ timestamps: true },
);

accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const sessionSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId(),
		},
		sessionToken: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		expires: {
			type: Date,
		},
	},
	{ timestamps: true },
);

const verificationSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId(),
		},
		identifier: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			unique: true,
			required: true,
		},
		expires: {
			type: Date,
		},
	},
	{ timestamps: true },
);

verificationSchema.index({ identifier: 1, token: 1 }, { unique: true });

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
export const AccountModel =
	mongoose.models.Account || mongoose.model('Account', accountSchema);
export const SessionModel =
	mongoose.models.Session || mongoose.model('Session', sessionSchema);
export const verificationModel =
	mongoose.models.Verification ||
	mongoose.model('Verification', verificationSchema);
export const MovieModel =
	mongoose.models.Movie || mongoose.model('Movie', movieSchema);
