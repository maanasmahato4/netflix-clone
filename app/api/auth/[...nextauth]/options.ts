import dbConnect from '@/lib/database/mongoose';
import { UserModel } from '@/lib/models';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				await dbConnect();
				if (!credentials?.email || !credentials?.password) {
					console.error('credentials not provided');
				}

				const user = await UserModel.findOne({ email: credentials?.email });
				if (!user) {
					console.error('user not found');
				}

				const isCorrectPassword = await bcrypt.compare(
					credentials?.password as string,
					user.hashedPassword,
				);

				if (!isCorrectPassword) {
					console.error('password does not match');
				}
				return user;
			},
		}),
	],
};
