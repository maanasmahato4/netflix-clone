import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

export interface ExtendedNextApiRequest<T = any> extends NextApiRequest {
	json: () => Promise<T>;
}

export interface UserCreds {
	username: string;
	email: string;
	password: string;
}

export interface SessionUser {
	name: string;
	email: string;
	image: string;
}

export interface Movie {
	_id?: string;
	title: string;
	description: string;
	duration: string;
	genre: string;
	thumbnailUrl: string;
	videoUrl: string;
}
