import { MovieModel } from '@/lib/models/index';
import dbConnect from '@/lib/database/mongoose';
import { NextResponse } from 'next/server';
import { Movie } from '@/@types/api';

export const GET = async (): Promise<NextResponse<Movie>> => {
	try {
		await dbConnect();
		const count: number = await MovieModel.countDocuments();
		const randomIndex = Math.floor(Math.random() * count);
		const randomMovie: Movie = await MovieModel.findOne().skip(randomIndex);
		return new NextResponse(JSON.stringify(randomMovie), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
	}
};
