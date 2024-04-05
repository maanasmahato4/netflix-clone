import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { UserModel } from './models';

export default async function AuthUser(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions);

	if (!session?.user?.email) {
		throw new Error('user not signed in');
	}

	const currentUser = await UserModel.findOne({ email: session.user.email });
	if (!currentUser) {
		throw new Error('user not found');
	}

	return currentUser;
}
