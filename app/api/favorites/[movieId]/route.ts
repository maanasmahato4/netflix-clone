import dbConnect from '@/lib/database/mongoose';
import { NextResponse } from 'next/server';
import { UserModel } from '@/lib/models';
import { NextApiRequest } from 'next';
import { RouteParams } from '../../movies/[movieId]/route';
import AuthUser from '@/lib/authUser';

dbConnect();

export const POST = async (req: NextApiRequest, context: RouteParams) => {
	try {
		const user = await AuthUser();
		const movieId = context.params.movieId;
		console.log('add new');
		if (!movieId) {
			return new NextResponse(JSON.stringify({ error: 'movie not found' }), {
				status: 404,
			});
		}

		if (!user) {
			return new NextResponse(JSON.stringify({ error: 'user not found' }), {
				status: 404,
			});
		}
		const saved = await UserModel.findOneAndUpdate(
			{ email: user.email },
			{
				$addToSet: { favoriteIds: movieId },
			},
			{ new: true },
		);

		return new NextResponse(JSON.stringify({ user: saved }), { status: 200 });
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
};

export const DELETE = async (req: NextApiRequest, context: RouteParams) => {
	try {
		const user = await AuthUser();
		const movieId = context.params.movieId;
		console.log('delete');
		if (!movieId) {
			return new NextResponse(JSON.stringify({ error: 'movie not found' }), {
				status: 404,
			});
		}

		if (!user) {
			return new NextResponse(JSON.stringify({ error: 'user not found' }), {
				status: 404,
			});
		}

		const saved = await UserModel.findOneAndUpdate(
			{ email: user.email },
			{ $pull: { favoriteIds: movieId } },
			{ new: true },
		);

		return new NextResponse(JSON.stringify({ user: saved }), { status: 200 });
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
};
