import dbConnect from '@/lib/database/mongoose';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { UserModel } from '@/lib/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { RouteParams } from '../../movies/[movieId]/route';

dbConnect();

export const POST = async (req: NextApiResponse, context: RouteParams) => {
	try {
		const movieId = context.params.movieId;
		if (!movieId) {
			return new NextResponse(JSON.stringify({ error: 'movie not found' }), {
				status: 404,
			});
		}

		const session = await getServerSession();
		if (!session?.user) {
			return new NextResponse(JSON.stringify({ error: 'user not found' }), {
				status: 404,
			});
		}
		await UserModel.findOneAndUpdate(
			{ email: session.user.email },
			{
				$addToSet: { favoriteIds: movieId },
			},
			{ new: true },
		);

		return new NextResponse(null, { status: 200 });
	} catch (error) {
		return new NextResponse(JSON.stringify({ error }), { status: 500 });
	}
};

export const DELETE = async (req: NextApiRequest, context: RouteParams) => {
	try {
		const movieId = context.params.movieId;
		if (!movieId) {
			return new NextResponse(JSON.stringify({ error: 'movie not found' }), {
				status: 404,
			});
		}

		const session = await getServerSession();
		if (!session?.user) {
			return new NextResponse(JSON.stringify({ error: 'user not found' }), {
				status: 404,
			});
		}

		await UserModel.findOneAndUpdate(
			{ email: session.user.email },
			{ $pull: { favoriteIds: movieId } },
		);

		return new NextResponse(null, { status: 200 });
	} catch (error) {
		return new NextResponse(JSON.stringify({ error }), { status: 500 });
	}
};
