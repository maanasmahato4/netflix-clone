import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { UserModel } from './models';
import { User } from '@/@types/api';

export default async function AuthUser(): Promise<User> {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		throw new Error('user not signed in');
	}

	const currentUser = await UserModel.findOne({ email: session.user.email });
	if (!currentUser) {
		throw new Error('user not found');
	}
	return currentUser;
}
