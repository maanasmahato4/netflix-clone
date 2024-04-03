import dbConnect from '@/lib/database/mongoose';
import { MovieModel } from '@/lib/models';
import { NextApiRequest, Route } from 'next';
import { NextResponse } from 'next/server';

export interface RouteParams {
	params: {
		movieId: string;
	};
}

export const GET = async (
	req: NextApiRequest,
	context: RouteParams,
): Promise<NextResponse> => {
	try {
		await dbConnect();
		const id = context.params.movieId;
		if (!id) {
			return new NextResponse(JSON.stringify({ error: 'movie not found' }), {
				status: 404,
			});
		}
		const movie = await MovieModel.findById(id);
		return new NextResponse(JSON.stringify(movie), { status: 200 });
	} catch (error) {
		return new NextResponse(JSON.stringify(error), { status: 500 });
	}
};
