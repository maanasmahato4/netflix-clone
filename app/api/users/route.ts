import { ExtendedNextApiRequest } from '@/@types/api';
import dbConnect from '@/lib/database/mongoose';
import { UserModel } from '@/lib/models';
import { NextResponse } from 'next/server';

export const POST = async (req: ExtendedNextApiRequest<{ email: string }>) => {
	await dbConnect();
	try {
		const { email } = await req.json();
		const user = await UserModel.findOne({ email });
		return new NextResponse(JSON.stringify({ user }), { status: 200 });
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
};
