import AuthUser from '@/lib/authUser';
import dbConnect from '@/lib/database/mongoose';
import { NextResponse } from 'next/server';

export const GET = async () => {
	await dbConnect();
	try {
		const currentUser = await AuthUser();
		return new NextResponse(JSON.stringify({ user: currentUser }), {
			status: 200,
		});
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
};
