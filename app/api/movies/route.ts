import dbConnect from '@/lib/database/mongoose';
import { MovieModel } from '@/lib/models';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> => {
	try {
		await dbConnect();
		const movies = await MovieModel.find();
		return new NextResponse(JSON.stringify(movies), { status: 200 });
	} catch (error) {
		return new NextResponse(JSON.stringify(error), { status: 500 });
	}
};
