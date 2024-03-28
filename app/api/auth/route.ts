import bcrypt from 'bcrypt';
import { UserModel } from '@/lib/models/index';
import dbConnect from '@/lib/database/mongoose';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { ExtendedNextApiRequest, UserCreds } from '@/@types/api';

export async function POST(req: ExtendedNextApiRequest, res: NextApiResponse) {
	await dbConnect();
	const userCreds: UserCreds = await req.json();
	const userExists = await UserModel.findOne({
		email: userCreds.email,
	});
	if (userExists) {
		return new NextResponse(
			JSON.stringify({ message: 'user already exists' }),
			{ status: 400 },
		);
	}
	const user = {
		name: userCreds.username,
		email: userCreds.email,
		hashedPassword: await bcrypt.hash(userCreds.password, 10),
		image: '',
		emailVerified: new Date(),
	};
	const newUser = await UserModel.create(user);

	return new NextResponse(
		JSON.stringify({ message: 'success', user: newUser }),
		{
			status: 200,
		},
	);
}
